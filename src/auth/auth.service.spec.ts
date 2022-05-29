import { Test, TestingModule } from '@nestjs/testing';
import { jwtConstants } from './auth.constants';
import { UserModule } from 'user/user.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from 'user/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONFIG } from 'common/configs';
import { RegisterUserDto } from './dto';
import { HttpException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: jwtConstants.expiresIn },
        }),
        MongooseModule.forRoot(MONGO_CONFIG()),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an exception on registration with only username', async () => {
    const registerUserDto: RegisterUserDto = {
      username: 'test',
      profile: {},
    };

    expect(
      async () => await service.register(registerUserDto),
    ).rejects.toThrowError(expect.any(HttpException));
  });
});
