import { User, UserDocument } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  public async count(filter?: any): Promise<number> {
    return await this.userModel.count(filter).exec();
  }

  public async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return await this.userModel.create({
      ...createUserDto,
      createdAt: new Date(),
    });
  }

  public async find(filter?: any): Promise<UserDocument[]> {
    return await this.userModel.find(filter).exec();
  }

  public async findOne(filter: any, projection?: any): Promise<UserDocument> {
    return await this.userModel.findOne(filter, projection).exec();
  }

  public async findById(id: string, projection?: any): Promise<UserDocument> {
    return await this.userModel.findById(id, projection).exec();
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return await this.userModel
      .findByIdAndUpdate(
        id,
        { ...updateUserDto, updatedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  public async delete(id: string): Promise<UserDocument> {
    return await this.userModel
      .findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true })
      .exec();
  }

  public async restore(id: string): Promise<UserDocument> {
    return await this.userModel
      .findByIdAndUpdate(
        id,
        { restoredAt: new Date(), $unset: { deletedAt: 1 } },
        { new: true },
      )
      .exec();
  }

  public async destroy(id: string): Promise<UserDocument> {
    return await this.userModel.findByIdAndRemove(id).exec();
  }
}
