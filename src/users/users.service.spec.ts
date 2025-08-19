import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
      };

      const result = service.create(createUserDto);

      expect(result).toHaveProperty('id', 1);
      expect(result.firstName).toBe(createUserDto.firstName);
      expect(result.lastName).toBe(createUserDto.lastName);
      expect(result.email).toBe(createUserDto.email);
      expect(result.phone).toBe(createUserDto.phone);
      expect(result.isEmailVerified).toBe(false);
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
      };

      service.create(createUserDto);
      const result = service.findAll();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
      };

      const createdUser = service.create(createUserDto);
      const result = service.findOne(createdUser.id);

      expect(result).toEqual(createdUser);
    });

    it('should return null for non-existent user', () => {
      const result = service.findOne(999);
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
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

      const result = service.update(createdUser.id, updateUserDto);

      expect(result.firstName).toBe('Jane');
      expect(result.email).toBe('jane@example.com');
      expect(result.lastName).toBe('Doe'); // Should remain unchanged
    });

    it('should throw NotFoundException for non-existent user', () => {
      const updateUserDto: UpdateUserDto = {
        id: 999,
        firstName: 'Jane',
      };

      expect(() => service.update(999, updateUserDto)).toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a user', () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
      };

      const createdUser = service.create(createUserDto);
      const result = service.remove(createdUser.id);

      expect(result).toBe(true);
      expect(service.findOne(createdUser.id)).toBeNull();
    });

    it('should throw NotFoundException for non-existent user', () => {
      expect(() => service.remove(999)).toThrow(NotFoundException);
    });
  });
});
