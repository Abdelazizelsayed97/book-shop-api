import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  VerifyOtpDto,
  ResendOtpDto,
} from './dto/create-auth.input';
import {
  AuthResponse,
  OtpResponse,
  UserWithoutPassword,
} from './entities/auth.entity';
import { EmailService } from './email.service';
import { JwtAuthService } from './jwt.service';

import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/createUser.dto';

import { UpdateUserDto } from 'src/users/dto/updateUser.dto';
import { UsersService } from 'src/users/users.service';
import { Args, Mutation } from '@nestjs/graphql';

@Injectable()
export class AuthService {
  private verificationTokens: Map<string, any> = new Map();
  private resetTokens: Map<string, any> = new Map();
  private otpCodes: Map<string, any> = new Map();

  constructor(
    private readonly emailService: EmailService,
    private readonly jwtAuthService: JwtAuthService,
    private readonly usersService: UsersService,
  ) { }

  @Mutation(() => AuthResponse, { name: "register" })
  async register(@Args('registerInput') registerDto: RegisterDto): Promise<AuthResponse> {
    console.log('Registering user:', registerDto);
    const allUsers = await this.usersService.findAll();
    console.log('All users:', allUsers);
    const existingUser = allUsers.find(
      (user) => user.email === registerDto.email,
    );
    console.log('Existing user:', existingUser);
    if (existingUser) {
      throw new BadRequestException('البريد الإلكتروني مستخدم بالفعل');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const verificationToken = this.jwtAuthService.generateVerificationToken();


    const createUserDto: CreateUserDto = {
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      email: registerDto.email,
      password: hashedPassword,
      phone: registerDto.phone,
      role: registerDto.role,
    };

    const newUser = await this.usersService.create(createUserDto);

    // إضافة معلومات التحقق
    const updateUserDto: UpdateUserDto = {
      id: newUser.id,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 ساعة
    };

    this.usersService.update(newUser.id, updateUserDto);

    this.verificationTokens.set(verificationToken, {
      userId: newUser.id,
      email: newUser.email,
      expires: updateUserDto.emailVerificationExpires,
    });
    // console.log('New user registered: before email sent', newUser);
    // await this.emailService.sendVerificationEmail(
    //   newUser.email,
    //   verificationToken,
    // );
    console.log('New user registered: after email sent', newUser);
    return {
      success: true,
      message:
        'تم التسجيل بنجاح. يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب.',
      token: verificationToken,
      user: newUser,
    };
  }

  @Mutation(() => AuthResponse, { name: "login" })
  async login(@Args('loginInput') loginInput: LoginDto): Promise<AuthResponse> {
    const user = await this.usersService.findByEmail(loginInput.email);
    console.log('User found:', user);
    if (!user) {
      throw new UnauthorizedException('بيانات الدخول غير صحيحة');
    }
    console.log('User found:', user);
    const isPasswordValid = await bcrypt.compare(
      loginInput.password,
      user.password!,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('بيانات الدخول غير صحيحة');
    }

    if (!user.isEmailVerified) {
      throw new BadRequestException('يرجى تأكيد بريدك الإلكتروني أولاً');
    }

    const token = this.jwtAuthService.generateToken({
      userId: user.id,
      email: user.email,
    });

    const userWithoutPassword: UserWithoutPassword = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      isEmailVerified: user.isEmailVerified,
      emailVerificationToken: user.emailVerificationToken,
      emailVerificationExpires: user.emailVerificationExpires,
      resetPasswordToken: user.resetPasswordToken,
      resetPasswordExpires: user.resetPasswordExpires,
      otpCode: user.otpCode,
      otpExpires: user.otpExpires,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      // name: user.name,
      role: user.role,
      token: token,
    };

    return {
      success: true,
      message: 'Operation done successfully',
      token: token,
      user: userWithoutPassword,

    }


    // {
    //   success: true,
    //   message: 'Operation done successfully',
    //   token,
    //   user: userWithoutPassword,
    // };
  }

  async verifyEmail(otpCode: string, user_id: string): Promise<AuthResponse> {
    // const verificationData = this.verificationTokens.get(otpCode);
    if (otpCode !== "1234") {
      throw new BadRequestException('رمز التحقق غير صحيح');
    }

    const user = await this.usersService.findByID(user_id);
    if (new Date() > user?.emailVerificationExpires!) {
      this.verificationTokens.delete(otpCode);
      throw new BadRequestException('رمز التحقق منتهي الصلاحية');
    }


    if (!user) {
      throw new BadRequestException('المستخدم غير موجود');
    }

    const updateUserDto: UpdateUserDto = {
      id: user.id,
      isEmailVerified: true,
      emailVerificationToken: undefined,
      emailVerificationExpires: undefined,
    };

    this.usersService.update(user.id, updateUserDto);
    this.verificationTokens.delete(otpCode);

    return {
      success: true,
      message: 'تم تأكيد البريد الإلكتروني بنجاح',
    };
  }

  async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<AuthResponse> {
    const allUsers = await this.usersService.findAll();
    const user = allUsers.find((u) => u.email === forgotPasswordDto.email);
    if (!user) {
      throw new BadRequestException('البريد الإلكتروني غير موجود');
    }

    const resetToken = this.jwtAuthService.generateResetToken();
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000);

    const updateUserDto: UpdateUserDto = {
      id: user.id,
      resetPasswordToken: resetToken,
      resetPasswordExpires: resetExpires,
    };

    this.usersService.update(user.id, updateUserDto);

    this.resetTokens.set(resetToken, {
      userId: user.id,
      email: user.email,
      expires: resetExpires,
    });

    await this.emailService.sendResetPasswordEmail(user.email, resetToken);

    return {
      success: true,
      message: 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني',
    };
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<AuthResponse> {
    const resetData = this.resetTokens.get(resetPasswordDto.token);
    if (!resetData) {
      throw new BadRequestException('رمز إعادة التعيين غير صحيح');
    }

    if (new Date() > resetData.expires) {
      this.resetTokens.delete(resetPasswordDto.token);
      throw new BadRequestException('رمز إعادة التعيين منتهي الصلاحية');
    }

    const user = await this.usersService.findByID(resetData.userId);
    if (!user) {
      throw new BadRequestException('المستخدم غير موجود');
    }

    const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);
    const updateUserDto: UpdateUserDto = {
      id: user.id,
      password: hashedPassword,
      resetPasswordToken: undefined,
      resetPasswordExpires: undefined,
    };

    this.usersService.update(user.id, updateUserDto);
    this.resetTokens.delete(resetPasswordDto.token);

    return {
      success: true,
      message: 'تم إعادة تعيين كلمة المرور بنجاح',
    };
  }

  async sendOtp(email: string): Promise<OtpResponse> {
    const allUsers = await this.usersService.findAll();
    const user = allUsers.find((u) => u.email === email);
    if (!user) {
      throw new BadRequestException('البريد الإلكتروني غير موجود');
    }

    const otp = this.jwtAuthService.generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const updateUserDto: UpdateUserDto = {
      id: user.id,
      otpCode: otp,
      otpExpires: otpExpires,
    };

    this.usersService.update(user.id, updateUserDto);

    this.otpCodes.set(email, {
      otp,
      expires: otpExpires,
    });

    await this.emailService.sendOtpEmail(email, otp);

    return {
      success: true,
      message: 'تم إرسال رمز التحقق إلى بريدك الإلكتروني',
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<AuthResponse> {
    const otpData = this.otpCodes.get(verifyOtpDto.email);
    if (!otpData) {
      throw new BadRequestException('رمز التحقق غير صحيح');
    }

    if (new Date() > otpData.expires) {
      this.otpCodes.delete(verifyOtpDto.email);
      throw new BadRequestException('رمز التحقق منتهي الصلاحية');
    }

    if (otpData.otp !== verifyOtpDto.otpCode) {
      throw new BadRequestException('رمز التحقق غير صحيح');
    }

    const allUsers = await this.usersService.findAll();
    const user = allUsers.find((u) => u.email === verifyOtpDto.email);
    if (!user) {
      throw new BadRequestException('المستخدم غير موجود');
    }

    const updateUserDto: UpdateUserDto = {
      id: user.id,
      otpCode: undefined,
      otpExpires: undefined,
    };

    this.usersService.update(user.id, updateUserDto);
    this.otpCodes.delete(verifyOtpDto.email);

    return {
      success: true,
      message: 'تم التحقق من الرمز بنجاح',
    };
  }

  async resendOtp(resendOtpDto: ResendOtpDto): Promise<OtpResponse> {
    return this.sendOtp(resendOtpDto.email);
  }
}
