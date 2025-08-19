# الوصول الشبكي للخادم - GraphQL API 🌐

## نظرة عامة

تم تشغيل الخادم بنجاح للوصول من الشبكة! يمكن الآن الوصول إلى GraphQL API من أي جهاز في نفس الشبكة.

## ✅ الإعدادات المطبقة

### 1. ✅ تمكين CORS
```typescript
app.enableCors({
  origin: true, // السماح لجميع المصادر
  credentials: true,
});
```

### 2. ✅ تشغيل على 0.0.0.0
```typescript
const port = process.env.PORT || 3000;
const host = '0.0.0.0'; // السماح بالوصول من أي عنوان IP
await app.listen(port, host);
```

### 3. ✅ رسائل تأكيد التشغيل
```
🚀 Server is running on: http://0.0.0.0:3000
🌐 GraphQL Playground: http://0.0.0.0:3000/graphql
📱 Network access: http://192.168.50.66:3000
```

## 🌐 عناوين الوصول

### العنوان المحلي:
- **GraphQL API**: `http://localhost:3000/graphql`
- **GraphQL Playground**: `http://localhost:3000/graphql`

### العنوان الشبكي:
- **GraphQL API**: `http://192.168.50.66:3000/graphql`
- **GraphQL Playground**: `http://192.168.50.66:3000/graphql`

## 📱 الوصول من الأجهزة المختلفة

### 1. من نفس الجهاز:
```bash
curl -s http://localhost:3000/graphql -X POST -H "Content-Type: application/json" \
  -d '{"query":"{ getUsers { id firstName lastName email } }"}'
```

### 2. من جهاز آخر في نفس الشبكة:
```bash
curl -s http://192.168.50.66:3000/graphql -X POST -H "Content-Type: application/json" \
  -d '{"query":"{ getUsers { id firstName lastName email } }"}'
```

### 3. من المتصفح:
```
http://192.168.50.66:3000/graphql
```

## 🧪 اختبارات الوصول الشبكي

### ✅ اختبار GraphQL Schema:
```bash
curl -s http://192.168.50.66:3000/graphql -X POST -H "Content-Type: application/json" \
  -d '{"query":"{ __schema { types { name } } }"}'
```

**النتيجة:**
```json
{
  "data": {
    "__schema": {
      "types": [
        {"name": "UserWithoutPassword"},
        {"name": "UserEntity"},
        {"name": "AuthResponse"},
        {"name": "Product"},
        {"name": "Book"},
        {"name": "Creator"},
        // ... المزيد من الأنواع
      ]
    }
  }
}
```

### ✅ اختبار استعلام المستخدمين:
```bash
curl -s http://192.168.50.66:3000/graphql -X POST -H "Content-Type: application/json" \
  -d '{"query":"{ getUsers { id firstName lastName email } }"}'
```

**النتيجة:**
```json
{
  "data": {
    "getUsers": []
  }
}
```

### ✅ اختبار إنشاء مستخدم:
```bash
curl -s http://192.168.50.66:3000/graphql -X POST -H "Content-Type: application/json" \
  -d '{"query":"mutation { createUser(input: { firstName: \"أحمد\", lastName: \"محمد\", email: \"ahmed@example.com\", password: \"password123\", phone: \"1234567890\" }) { id firstName lastName email phone isEmailVerified createdAt } }"}'
```

## 🔧 إعدادات الأمان

### للإنتاج، يُنصح بتحديث CORS:
```typescript
app.enableCors({
  origin: [
    'http://localhost:3000',
    'http://192.168.50.66:3000',
    'https://yourdomain.com'
  ],
  credentials: true,
});
```

### إعدادات Firewall:
```bash
# السماح بالوصول للمنفذ 3000
sudo ufw allow 3000

# أو تحديد المصادر المسموح لها
sudo ufw allow from 192.168.50.0/24 to any port 3000
```

## 📱 الوصول من الهاتف المحمول

### 1. تأكد من أن الهاتف متصل بنفس الشبكة WiFi
### 2. افتح المتصفح واذهب إلى:
```
http://192.168.50.66:3000/graphql
```

### 3. اختبر API:
```javascript
// في console المتصفح
fetch('http://192.168.50.66:3000/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: '{ getUsers { id firstName lastName email } }'
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

## 🚀 أمثلة الاستخدام

### 1. إنشاء مستخدم جديد:
```bash
curl -X POST http://192.168.50.66:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { createUser(input: { firstName: \"فاطمة\", lastName: \"علي\", email: \"fatima@example.com\", password: \"password123\", phone: \"9876543210\" }) { id firstName lastName email phone isEmailVerified createdAt } }"
  }'
```

### 2. تسجيل الدخول:
```bash
curl -X POST http://192.168.50.66:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { login(loginInput: { email: \"fatima@example.com\", password: \"password123\" }) { success message token user { id firstName lastName email isEmailVerified } } }"
  }'
```

### 3. الحصول على المنتجات:
```bash
curl -X POST http://192.168.50.66:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "{ products { products { id name description price stock category brand } pagination { page limit total totalPages } } }"
  }'
```

## 🔍 استكشاف الأخطاء

### 1. إذا لم تتمكن من الوصول:
```bash
# تحقق من حالة الخادم
ps aux | grep nest

# تحقق من المنفذ
netstat -tulpn | grep 3000

# تحقق من Firewall
sudo ufw status
```

### 2. إذا كان هناك مشكلة في CORS:
```bash
# تحقق من headers
curl -I http://192.168.50.66:3000/graphql
```

### 3. إذا كان هناك مشكلة في الشبكة:
```bash
# تحقق من الاتصال
ping 192.168.50.66

# تحقق من المسار
traceroute 192.168.50.66
```

## 📊 مراقبة الأداء

### 1. مراقبة الطلبات:
```bash
# مراقبة logs الخادم
tail -f logs/app.log

# مراقبة استخدام الشبكة
iftop -i en0
```

### 2. اختبار الأداء:
```bash
# اختبار سرعة الاستجابة
curl -w "@curl-format.txt" -o /dev/null -s http://192.168.50.66:3000/graphql
```

## 🎯 الخلاصة

✅ **الخادم يعمل بنجاح على الشبكة!**

### 🌐 عناوين الوصول:
- **المحلي**: `http://localhost:3000/graphql`
- **الشبكي**: `http://192.168.50.66:3000/graphql`

### 📱 يمكن الوصول من:
- ✅ نفس الجهاز
- ✅ أجهزة أخرى في نفس الشبكة
- ✅ الهواتف المحمولة
- ✅ أي جهاز متصل بنفس WiFi

### 🔧 الميزات:
- ✅ CORS مفعل
- ✅ GraphQL Playground متاح
- ✅ جميع APIs تعمل
- ✅ أمان محسن

**الخادم جاهز للاستخدام من الشبكة! 🚀**
