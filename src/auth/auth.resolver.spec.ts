import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { EmailService } from './email.service';
import { JwtAuthService } from './jwt.service';
import { UsersService } from '../users/users.service';

describe('AuthResolver', () => {
  let resolver: AuthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
            verifyEmail: jest.fn(),
            forgotPassword: jest.fn(),
            resetPassword: jest.fn(),
            sendOtp: jest.fn(),
            verifyOtp: jest.fn(),
            resendOtp: jest.fn(),
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendVerificationEmail: jest.fn(),
            sendResetPasswordEmail: jest.fn(),
            sendOtpEmail: jest.fn(),
          },
        },
        {
          provide: JwtAuthService,
          useValue: {
            generateVerificationToken: jest.fn(),
            generateResetToken: jest.fn(),
            generateOtp: jest.fn(),
            generateToken: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
