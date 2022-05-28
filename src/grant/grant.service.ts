import { Injectable } from '@nestjs/common';
import { CreateGrantDto } from './dto/create-grant.dto';
import { UpdateGrantDto } from './dto/update-grant.dto';
import { GrantDocument } from './entities/grant.entity';
import { GrantRepository } from './grant.repository';

@Injectable()
export class GrantService {
  constructor(private readonly grantRepository: GrantRepository) {}

  public async count(filter?: any): Promise<number> {
    return await this.grantRepository.count(filter);
  }

  public async create(createGrantDto: CreateGrantDto): Promise<GrantDocument> {
    return await this.grantRepository.create(createGrantDto);
  }

  public async find(filter?: any): Promise<GrantDocument[]> {
    return await this.grantRepository.find(filter);
  }

  public async findAll(): Promise<GrantDocument[]> {
    return await this.grantRepository.findAll();
  }

  public async findOne(filter: any, projection?: any): Promise<GrantDocument> {
    return await this.grantRepository.findOne(filter, projection);
  }

  public async findById(id: string, projection?: any): Promise<GrantDocument> {
    return await this.grantRepository.findById(id, projection);
  }

  public async update(
    id: string,
    updateGrantDto: UpdateGrantDto,
  ): Promise<GrantDocument> {
    return await this.grantRepository.update(id, updateGrantDto);
  }

  public async delete(id: string): Promise<GrantDocument> {
    return await this.grantRepository.delete(id);
  }

  public async restore(id: string): Promise<GrantDocument> {
    return await this.grantRepository.restore(id);
  }

  public async destroy(id: string): Promise<GrantDocument> {
    return await this.grantRepository.destroy(id);
  }
}
