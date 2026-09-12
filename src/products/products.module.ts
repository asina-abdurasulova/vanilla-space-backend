import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { LotsController } from './products.controller';
import { PrismaService } from '../prisma.service';
import { LotsGateway } from './lots.gateway'; 

@Module({
  controllers: [LotsController],
  providers: [ProductsService, PrismaService, LotsGateway], 
})
export class ProductsModule {}