
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; 

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  

   
  async findAll(page: number = 1, limit: number = 6) {
    const skip = (page - 1) * limit;

    
    const [data, total] = await this.prisma.$transaction([
      this.prisma.lot.findMany({
        skip: Number(skip),
        take: Number(limit),
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.lot.count(),
    ]);

    return {
      data,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    return this.prisma.lot.findUnique({
      where: { id },
    });
  }

  async updatePrice(id: number, newPrice: number) {
    return this.prisma.lot.update({
      where: { id },
      data: { min_bid_rub: newPrice },
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

      // сюда приходят URL из ImgBB
      image_url: data.mainImage || null,
    },
  });
}
}

