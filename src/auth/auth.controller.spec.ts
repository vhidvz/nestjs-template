import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MONGO_CONFIG } from 'common/configs';
import { User, UserSchema } from 'user/entities/user.entity';
import { UserModule } from 'user/user.module';
import { UserService } from 'user/user.service';
import { jwtConstants } from './auth.constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginUserResDto } from './dto';

describe('AuthController', () => {
  let controller: AuthController;

  let userService: UserService;

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
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return login user', async () => {
    const user = await userService.findOne({ username: 'test' });
    expect(user).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...entity } = user.toObject<User>();

    const login: LoginUserResDto = await controller.login(entity);
    expect(login).toStrictEqual<LoginUserResDto>({
      accessToken: expect.any(String),
    });
  });
});
