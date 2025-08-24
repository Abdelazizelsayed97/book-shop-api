import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './entities/user.entity';

describe('UsersResolver', () => {
  let usersResolver: UsersResolver;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersResolver],
      providers: [UsersService],
    }).compile();

    usersResolver = module.get<UsersResolver>(UsersResolver);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersResolver).toBeDefined();
  });

  describe('getUsers', async () => {
    it('should return an array of users', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
      };

      service.create(createUserDto);
      const result = await usersResolver.getUsers();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('getUser', () => {
    it('should return a user by id', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
      };

      const createdUser = await service.create(createUserDto);
      const result = await usersResolver.getUser(createdUser.id);

      expect(result).toEqual(createdUser);
    });

    it('should return null for non-existent user', () => {
      const result = usersResolver.getUser('999');
      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
      };

      const result = await usersResolver.createUser(createUserDto);

      expect(result).toHaveProperty('id');
      expect(result.firstName).toBe(createUserDto.firstName);
      expect(result.lastName).toBe(createUserDto.lastName);
      expect(result.email).toBe(createUserDto.email);
      expect(result.phone).toBe(createUserDto.phone);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
      };

      const createdUser = await service.create(createUserDto);
      const updateUserDto: UpdateUserDto = {
        id: createdUser.id,
        firstName: 'Jane',
        email: 'jane@example.com',
      };

      const result = await usersResolver.updateUser(updateUserDto);

      expect(result.firstName).toBe('Jane');
      expect(result.email).toBe('jane@example.com');
      expect(result.lastName).toBe('Doe'); // Should remain unchanged
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
      };

      const createdUser = await service.create(createUserDto);
      const result = usersResolver.deleteUser(createdUser.id);

      expect(result).toBe(true);
      expect(service.findByID(createdUser.id)).toBeNull();
    });
  });
});
