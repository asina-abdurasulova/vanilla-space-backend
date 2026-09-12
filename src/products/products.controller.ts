

import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('lots')
export class LotsController {
  constructor(private readonly lotsService: ProductsService) {}

  @Post()
  create(@Body() createLotDto: any) {
    console.log('Данные от frontend:', createLotDto);

    return this.lotsService.create(createLotDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lotsService.findOne(+id);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 6,
  ) {
    return this.lotsService.findAll(page, limit);
  }
}