import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse, OtpResponse } from './entities/auth.entity';
import {
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  VerifyOtpDto,
  ResendOtpDto,
} from './dto/create-auth.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => AuthResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
  ): Promise<AuthResponse> {
    return this.authService.register(registerDto);
  }

  @Mutation(() => AuthResponse)
  async login(@Args('loginInput') loginInput: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }

  @Mutation(() => AuthResponse)
  async verifyEmail(@Args('otpCode') otpCode: string, @Args('userId') userId: string): Promise<AuthResponse> {
    return this.authService.verifyEmail(otpCode, userId);
  }

  @Mutation(() => AuthResponse)
  async forgotPassword(
    @Args('forgotPasswordDto') forgotPasswordDto: ForgotPasswordDto,
  ): Promise<AuthResponse> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Mutation(() => AuthResponse)
  async resetPassword(
    @Args('resetPasswordDto') resetPasswordDto: ResetPasswordDto,
  ): Promise<AuthResponse> {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Mutation(() => OtpResponse)
  async sendOtp(@Args('email') email: string): Promise<OtpResponse> {
    return this.authService.sendOtp(email);
  }

  @Mutation(() => AuthResponse)
  async verifyOtp(
    @Args('verifyOtpDto') verifyOtpDto: VerifyOtpDto,
  ): Promise<AuthResponse> {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  @Mutation(() => OtpResponse)
  async resendOtp(
    @Args('resendOtpDto') resendOtpDto: ResendOtpDto,
  ): Promise<OtpResponse> {
    return this.authService.resendOtp(resendOtpDto);
  }
}
