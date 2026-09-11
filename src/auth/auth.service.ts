

import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  
  async register(dto: any) {
    const candidate = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { phone: dto.phone }],
      },
    });

    if (candidate) {
      throw new ConflictException('Пользователь с таким E-mail или телефоном уже существует');
    }

   
    const generatedPassword = Math.random().toString(36).slice(-8);
  
   
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const user = await this.prisma.user.create({
      data: {
        type: dto.type,
        role: dto.role,
        phone: dto.phone,
        email: dto.email,
        inn: dto.inn,
        password: hashedPassword, 
      },
    });

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);

   
    return {
      accessToken,
      generatedPassword, 
    };
  }

async login(dto: any) {
  
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: dto.login_contact.trim() },
          { phone: dto.login_contact.trim() }
        ],
      },
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь с такими данными не найден');
    }

    
    let isPasswordValid = false;
    try {
      isPasswordValid = await bcrypt.compare(dto.password.trim(), user.password);
    } catch (e) {
      isPasswordValid = user.password === dto.password.trim();
    }


    if (!isPasswordValid && user.password !== dto.password.trim()) {
      throw new UnauthorizedException('Неверный пароль');
    }

   
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}