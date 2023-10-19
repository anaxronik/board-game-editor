import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from 'src/schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll() {
    const start = Date.now();
    const totalCount = await this.catModel.count();
    const items = await this.catModel.find().skip(0).limit(10).exec();
    const duration = Date.now() - start;
    return { duration, totalCount, items };
  }
}
