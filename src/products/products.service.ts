import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    console.log(createProductDto);
    const product = await this.prisma.product.create({
      data: createProductDto,
    });
    return product;
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });
      // console.log(product);
      if (product == null) {
        throw new NotFoundException('product deleted or may be not found');
      }
      // console.log(product, 'this is product');
      else {
        return product;
      }
    } catch (err) {
      // console.log(err, 'errror');
      if (err instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('not valid object id', err.meta.message);
      }
      throw err;
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    const updateProduct = await this.prisma.product.update({
      where: {
        id,
      },
      data: updateProductDto,
    });

    return updateProduct;
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
