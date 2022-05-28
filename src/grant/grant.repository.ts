import { Grant, GrantDocument } from './entities/grant.entity';
import { UpdateGrantDto } from './dto/update-grant.dto';
import { CreateGrantDto } from './dto/create-grant.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class GrantRepository {
  constructor(
    @InjectModel(Grant.name) private readonly grantModel: Model<GrantDocument>,
  ) {}

  public async count(filter?: any): Promise<number> {
    return await this.grantModel.count(filter).exec();
  }

  public async create(createGrantDto: CreateGrantDto): Promise<GrantDocument> {
    return await this.grantModel.create({
      ...createGrantDto,
      createdAt: new Date(),
    });
  }

  public async find(filter?: any): Promise<GrantDocument[]> {
    return await this.grantModel.find(filter).exec();
  }

  public async findAll(): Promise<GrantDocument[]> {
    return await this.grantModel.find().exec();
  }

  public async findOne(filter: any, projection?: any): Promise<GrantDocument> {
    return await this.grantModel.findOne(filter, projection).exec();
  }

  public async findById(id: string, projection?: any): Promise<GrantDocument> {
    return await this.grantModel.findById(id, projection).exec();
  }

  public async update(
    id: string,
    updateGrantDto: UpdateGrantDto,
  ): Promise<GrantDocument> {
    return await this.grantModel
      .findByIdAndUpdate(
        id,
        { ...updateGrantDto, updatedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  public async delete(id: string): Promise<GrantDocument> {
    return await this.grantModel
      .findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true })
      .exec();
  }

  public async restore(id: string): Promise<GrantDocument> {
    return await this.grantModel
      .findByIdAndUpdate(
        id,
        { restoredAt: new Date(), $unset: { deletedAt: 1 } },
        { new: true },
      )
      .exec();
  }

  public async destroy(id: string): Promise<GrantDocument> {
    return await this.grantModel.findByIdAndRemove(id).exec();
  }
}
