import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Post('get')
  findAll(@Query() paginationQuery, @Body() body) {
    let { skip, take, name } = paginationQuery;
    const { sort, order } = paginationQuery;
    if (name) {
      name = name.charAt(0).toUpperCase() + name.slice(1);
    } else {
      name = '';
    }
    // console.log(sort, order);
    if (!skip) {
      skip = 0;
    }
    if (!take) {
      take = 1000;
    }
    return this.productsService.findAll(+skip, +take, sort, order, name, body);
  }

  @Get('search')
  findBySearch(@Query('name') name: string) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return this.productsService.findBySearch(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
