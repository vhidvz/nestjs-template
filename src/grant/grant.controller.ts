import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Filter } from 'common/decorators/restful-filter.decorator';
import { CreateGrantDto } from './dto/create-grant.dto';
import { UpdateGrantDto } from './dto/update-grant.dto';
import { Grant } from './entities/grant.entity';
import { GrantService } from './grant.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('grants')
@Controller('grants')
export class GrantController {
  constructor(private readonly grantService: GrantService) {}

  @Get()
  public async count(@Filter() filter: any): Promise<number> {
    return await this.grantService.count(filter);
  }

  @Post()
  public async create(@Body() createGrantDto: CreateGrantDto): Promise<Grant> {
    return await this.grantService.create(createGrantDto);
  }

  @Get()
  public async find(@Filter() filter: any): Promise<Grant[]> {
    return await this.grantService.find(filter);
  }

  @Get(':id')
  public async findById(@Param('id') id: string): Promise<Grant> {
    return await this.grantService.findById(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateGrantDto: UpdateGrantDto,
  ): Promise<Grant> {
    return await this.grantService.update(id, updateGrantDto);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<Grant> {
    return await this.grantService.delete(id);
  }

  @Put(':id/restore')
  public async restore(@Param('id') id: string): Promise<Grant> {
    return await this.grantService.restore(id);
  }
}
