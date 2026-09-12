
import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFiles, Query} from '@nestjs/common';
import { ProductsService } from './products.service';
import { FilesInterceptor } from '@nestjs/platform-express'; 
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('lots')
export class LotsController {
  constructor(private readonly lotsService: ProductsService) {}

  @Post()
 
  @UseInterceptors(FilesInterceptor('images', 10, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      }
    })
  }))
  create(@Body() createLotDto: any, @UploadedFiles() files: any[]) {

    const imagePaths = files && files.length > 0 
      ? files.map(file => `/uploads/${file.filename}`).join(',') 
      : null;

    return this.lotsService.create({ ...createLotDto, mainImage: imagePaths });
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