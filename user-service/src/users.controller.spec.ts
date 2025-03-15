import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('register', () => {
    it('повинен створити користувача', async () => {
      const createUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'test123',
      };
      const result = await usersController.register(createUserDto);
      expect(result).toHaveProperty('id');
      expect(result.email).toEqual(createUserDto.email);
    });
  });
});