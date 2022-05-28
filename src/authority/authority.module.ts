import { AuthorityService } from './authority.service';
import { GrantModule } from 'grant/grant.module';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { Grant } from 'grant/entities/grant.entity';

@Global()
@Module({})
export class AuthorityModule {
  static register(grant: Grant[]): DynamicModule {
    return {
      module: AuthorityModule,
      imports: [GrantModule],
      providers: [
        {
          provide: 'ACCESS_ABILITIES',
          useValue: grant,
        },
        AuthorityService,
      ],
      exports: [AuthorityService],
    };
  }
}
