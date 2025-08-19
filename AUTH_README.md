# نظام المصادقة - Authentication System

## الميزات المتاحة

### 1. التسجيل (Register)
```graphql
mutation {
  register(registerDto: {
    firstName: "أحمد"
    lastName: "محمد"
    email: "ahmed@example.com"
    password: "123456"
    phone: "0123456789"
  }) {
    success
    message
  }
}
```

### 2. تسجيل الدخول (Login)
```graphql
mutation {
  login(loginDto: {
    email: "ahmed@example.com"
    password: "123456"
  }) {
    success
    message
    token
    user {
      id
      firstName
      lastName
      email
      phone
      isEmailVerified
    }
  }
}
```

### 3. تأكيد البريد الإلكتروني (Email Verification)
```graphql
mutation {
  verifyEmail(token: "verification-token-here") {
    success
    message
  }
}
```

### 4. نسيان كلمة المرور (Forgot Password)
```graphql
mutation {
  forgotPassword(forgotPasswordDto: {
    email: "ahmed@example.com"
  }) {
    success
    message
  }
}
```

### 5. إعادة تعيين كلمة المرور (Reset Password)
```graphql
mutation {
  resetPassword(resetPasswordDto: {
    token: "reset-token-here"
    newPassword: "newpassword123"
  }) {
    success
    message
  }
}
```

### 6. إرسال رمز التحقق (Send OTP)
```graphql
mutation {
  sendOtp(email: "ahmed@example.com") {
    success
    message
  }
}
```

### 7. التحقق من رمز التحقق (Verify OTP)
```graphql
mutation {
  verifyOtp(verifyOtpDto: {
    email: "ahmed@example.com"
    otpCode: "123456"
  }) {
    success
    message
  }
}
```

### 8. إعادة إرسال رمز التحقق (Resend OTP)
```graphql
mutation {
  resendOtp(resendOtpDto: {
    email: "ahmed@example.com"
  }) {
    success
    message
  }
}
```

## الإعداد

### 1. تثبيت المتغيرات البيئية
انسخ ملف `env.example` إلى `.env` واملأ القيم المطلوبة:

```bash
cp env.example .env
```

### 2. إعداد البريد الإلكتروني (Gmail)
1. اذهب إلى إعدادات حساب Gmail
2. فعّل المصادقة الثنائية
3. أنشئ كلمة مرور للتطبيق
4. استخدم كلمة مرور التطبيق في `EMAIL_PASSWORD`

### 3. تشغيل التطبيق
```bash
npm run start:dev
```

## الأمان

- كلمات المرور مشفرة باستخدام bcrypt
- رموز JWT صالحة لمدة 7 أيام
- رموز التحقق صالحة لمدة 24 ساعة
- رموز إعادة تعيين كلمة المرور صالحة لمدة ساعة واحدة
- رموز OTP صالحة لمدة 10 دقائق

## ملاحظات

- النظام يستخدم التخزين المؤقت في الذاكرة حالياً
- للإنتاج، يُنصح باستخدام قاعدة بيانات
- تأكد من إعداد البريد الإلكتروني بشكل صحيح
- يمكن تخصيص قوالب البريد الإلكتروني حسب الحاجة
