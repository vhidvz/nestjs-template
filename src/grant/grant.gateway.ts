import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Filter } from 'common/decorators/socket-filter.decorator';
import { CreateGrantDto } from './dto/create-grant.dto';
import { UpdateGrantDto } from './dto/update-grant.dto';
import { Grant } from './entities/grant.entity';
import { GrantService } from './grant.service';

@WebSocketGateway()
export class GrantGateway {
  constructor(private readonly grantService: GrantService) {}

  @SubscribeMessage('countGrant')
  public async count(@Filter() filter: any): Promise<number> {
    return await this.grantService.count(filter);
  }

  @SubscribeMessage('createGrant')
  public async create(
    @MessageBody() createGrantDto: CreateGrantDto,
  ): Promise<Grant> {
    return await this.grantService.create(createGrantDto);
  }

  @SubscribeMessage('findGrant')
  public async find(@Filter() filter: any): Promise<Grant[]> {
    return await this.grantService.find(filter);
  }

  @SubscribeMessage('findGrantById')
  public async findById(@MessageBody() id: string): Promise<Grant> {
    return await this.grantService.findById(id);
  }

  @SubscribeMessage('updateGrant')
  public async update(
    @MessageBody() updateGrantDto: UpdateGrantDto,
  ): Promise<Grant> {
    return await this.grantService.update(updateGrantDto._id, updateGrantDto);
  }

  @SubscribeMessage('deleteGrant')
  public async delete(@MessageBody() id: string): Promise<Grant> {
    return await this.grantService.delete(id);
  }

  @SubscribeMessage('restoreGrant')
  public async restore(@MessageBody() id: string): Promise<Grant> {
    return await this.grantService.restore(id);
  }
}
