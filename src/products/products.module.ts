import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { LotsController } from './products.controller';
import { PrismaService } from '../prisma.service'; 
@Module({
  controllers: [LotsController], 
  providers: [ProductsService, PrismaService],
})
export class ProductsModule {}
