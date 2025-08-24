import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your-app-password',
      },
    });
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      password: process.env.EMAIL_PASSWORD || 'nxye jhnm nbgz okpu',
      subject: 'تأكيد البريد الإلكتروني',
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">مرحباً بك!</h2>
          <p>شكراً لك على التسجيل. يرجى النقر على الرابط التالي لتأكيد بريدك الإلكتروني:</p>
          <a href="${verificationUrl}" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
            تأكيد البريد الإلكتروني
          </a>
          <p>أو يمكنك نسخ الرابط التالي في المتصفح:</p>
          <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
          <p>هذا الرابط صالح لمدة 24 ساعة.</p>
        </div>
      `,
    };
    console.log('Sending verification email to:', email);
    await this.transporter.sendMail(mailOptions);
    console.log('Verification email sent to:', email);
  }

  async sendResetPasswordEmail(email: string, token: string): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: 'إعادة تعيين كلمة المرور',
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">إعادة تعيين كلمة المرور</h2>
          <p>لقد تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بك. انقر على الرابط التالي لإعادة تعيين كلمة المرور:</p>
          <a href="${resetUrl}" style="display: inline-block; background-color: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
            إعادة تعيين كلمة المرور
          </a>
          <p>أو يمكنك نسخ الرابط التالي في المتصفح:</p>
          <p style="word-break: break-all; color: #666;">${resetUrl}</p>
          <p>هذا الرابط صالح لمدة ساعة واحدة فقط.</p>
          <p>إذا لم تطلب إعادة تعيين كلمة المرور، يمكنك تجاهل هذا البريد الإلكتروني.</p>
        </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendOtpEmail(email: string, otp: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: 'رمز التحقق',
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">رمز التحقق</h2>
          <p>رمز التحقق الخاص بك هو:</p>
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 5px; margin: 20px 0;">
            <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
          </div>
          <p>هذا الرمز صالح لمدة 10 دقائق فقط.</p>
          <p>إذا لم تطلب هذا الرمز، يمكنك تجاهل هذا البريد الإلكتروني.</p>
        </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
