import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.resolver';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersResolver>(UsersResolver);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return an array of users', () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
      };

      service.create(createUserDto);
      const result = controller.getUsers();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('getUser', () => {
    it('should return a user by id', () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
      };

      const createdUser = service.create(createUserDto);
      const result = controller.getUser(createdUser.id);

      expect(result).toEqual(createdUser);
    });

    it('should return null for non-existent user', () => {
      const result = controller.getUser(999);
      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create a new user', () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
      };

      const result = controller.createUser(createUserDto);

      expect(result).toHaveProperty('id');
      expect(result.firstName).toBe(createUserDto.firstName);
      expect(result.lastName).toBe(createUserDto.lastName);
      expect(result.email).toBe(createUserDto.email);
      expect(result.phone).toBe(createUserDto.phone);
    });
  });

  describe('updateUser', () => {
    it('should update a user', () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
      };

      const createdUser = service.create(createUserDto);
      const updateUserDto: UpdateUserDto = {
        id: createdUser.id,
        firstName: 'Jane',
        email: 'jane@example.com',
      };

      const result = controller.updateUser(updateUserDto);

      expect(result.firstName).toBe('Jane');
      expect(result.email).toBe('jane@example.com');
      expect(result.lastName).toBe('Doe'); // Should remain unchanged
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
      };

      const createdUser = service.create(createUserDto);
      const result = controller.deleteUser(createdUser.id);

      expect(result).toBe(true);
      expect(service.findOne(createdUser.id)).toBeNull();
    });
  });
});
