
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; 

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  
  async findAll() {
    return this.prisma.lot.findMany({
      orderBy: { created_at: 'desc' }, 
    });
  }

  async findOne(id: number) {
    return this.prisma.lot.findUnique({
      where: { id },
    });
  }

  
  async create(data: any) {
    return this.prisma.lot.create({
      data: {
        title: `${data.brand} ${data.model}`,
        seller: data.seller || 'Частное лицо',
        year: Number(data.year),
        transmission: data.transmission,
        mileage_km: Number(data.mileage_km),
        engine: data.engine,
        min_bid_rub: Number(data.startPrice),
        vin: data.vin,
        vehicle_type: data.vehicle_type,
        brand: data.brand,
        model: data.model,
        region: data.region,
        city: data.city,
        auction_type: data.auction_type,
        image_url: data.mainImage,
      },
    });
  }
}