<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

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

### 4. الوصول إلى GraphQL Playground
افتح المتصفح واذهب إلى: **http://localhost:3000/graphql**

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

## اختبار النظام

1. شغل التطبيق: `npm run start:dev`
2. اذهب إلى: http://localhost:3000/graphql
3. جرب عمليات التسجيل وتسجيل الدخول
4. تحقق من البريد الإلكتروني للرسائل المرسلة

## ميزة المنتجات

### اختبار المنتجات
```graphql
# جلب جميع المنتجات
query {
  products {
    products {
      id
      name
      price
      brand
      category
    }
    pagination {
      total
      totalPages
    }
  }
}

# البحث عن منتجات
query {
  products(
    filter: { search: "iPhone", minPrice: 500 }
    pagination: { page: 1, limit: 5 }
    sort: { sortBy: "price", sortOrder: "DESC" }
  ) {
    products {
      name
      price
      rating
    }
  }
}
```

لمزيد من التفاصيل حول ميزة المنتجات، راجع ملف `PRODUCTS_README.md`
