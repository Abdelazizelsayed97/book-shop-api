# ميزة المنتجات - Products Feature

## الميزات المتاحة

### 1. إنشاء منتج جديد
```graphql
mutation {
  createProduct(createProductInput: {
    name: "iPhone 15 Pro Max"
    description: "أحدث هواتف آبل مع كاميرا متطورة"
    price: 1199.99
    stock: 30
    category: "هواتف"
    brand: "Apple"
    image: "https://example.com/iphone15-pro-max.jpg"
    rating: 4.9
    reviewCount: 1500
    isActive: true
  }) {
    id
    name
    price
    stock
    category
    brand
    rating
  }
}
```

### 2. جلب جميع المنتجات مع الترقيم والفلترة
```graphql
query {
  products(
    filter: {
      search: "iPhone"
      category: "هواتف"
      minPrice: 500
      maxPrice: 1500
      minRating: 4.5
      inStock: true
      isActive: true
    }
    pagination: {
      page: 1
      limit: 10
    }
    sort: {
      sortBy: "price"
      sortOrder: "DESC"
    }
  ) {
    products {
      id
      name
      description
      price
      stock
      category
      brand
      image
      rating
      reviewCount
      isActive
      createdAt
    }
    pagination {
      page
      limit
      total
      totalPages
      hasNext
      hasPrev
    }
  }
}
```

### 3. جلب منتج واحد
```graphql
query {
  product(id: 1) {
    id
    name
    description
    price
    stock
    category
    brand
    image
    rating
    reviewCount
    isActive
    createdAt
    updatedAt
  }
}
```

### 4. تحديث منتج
```graphql
mutation {
  updateProduct(updateProductInput: {
    id: 1
    price: 1099.99
    stock: 25
    rating: 4.8
  }) {
    id
    name
    price
    stock
    rating
    updatedAt
  }
}
```

### 5. حذف منتج
```graphql
mutation {
  removeProduct(id: 1) {
    id
    name
  }
}
```

### 6. جلب الفئات المتاحة
```graphql
query {
  categories
}
```

### 7. جلب الماركات المتاحة
```graphql
query {
  brands
}
```

### 8. جلب المنتجات حسب الفئة
```graphql
query {
  productsByCategory(category: "هواتف") {
    id
    name
    price
    brand
    rating
  }
}
```

### 9. جلب المنتجات حسب الماركة
```graphql
query {
  productsByBrand(brand: "Apple") {
    id
    name
    price
    category
    rating
  }
}
```

### 10. البحث في المنتجات
```graphql
query {
  searchProducts(query: "iPhone") {
    id
    name
    description
    price
    brand
    rating
  }
}
```

## خيارات الفلترة

### ProductFilterInput
- `search`: البحث في الاسم والوصف والماركة
- `category`: فلترة حسب الفئة
- `brand`: فلترة حسب الماركة
- `minPrice`: الحد الأدنى للسعر
- `maxPrice`: الحد الأقصى للسعر
- `minRating`: الحد الأدنى للتقييم (0-5)
- `inStock`: المنتجات المتوفرة فقط
- `isActive`: المنتجات النشطة فقط

### PaginationInput
- `page`: رقم الصفحة (افتراضي: 1)
- `limit`: عدد العناصر في الصفحة (افتراضي: 10، أقصى: 100)

### ProductSortInput
- `sortBy`: حقل الترتيب (`name`, `price`, `rating`, `createdAt`)
- `sortOrder`: اتجاه الترتيب (`ASC`, `DESC`)

## أمثلة عملية

### جلب المنتجات بترتيب السعر من الأعلى للأقل
```graphql
query {
  products(
    pagination: { page: 1, limit: 5 }
    sort: { sortBy: "price", sortOrder: "DESC" }
  ) {
    products {
      name
      price
      brand
    }
    pagination {
      total
      totalPages
    }
  }
}
```

### البحث عن هواتف آبل بأسعار معقولة
```graphql
query {
  products(
    filter: {
      search: "iPhone"
      brand: "Apple"
      maxPrice: 1000
      inStock: true
    }
    pagination: { page: 1, limit: 10 }
    sort: { sortBy: "rating", sortOrder: "DESC" }
  ) {
    products {
      name
      price
      rating
      stock
    }
    pagination {
      total
      hasNext
    }
  }
}
```

### جلب المنتجات حسب الفئة مع الترقيم
```graphql
query {
  products(
    filter: { category: "لابتوبات" }
    pagination: { page: 2, limit: 3 }
  ) {
    products {
      name
      price
      brand
      rating
    }
    pagination {
      page
      totalPages
      hasNext
      hasPrev
    }
  }
}
```

## البيانات الافتراضية

النظام يحتوي على بيانات افتراضية تشمل:
- iPhone 15 Pro (Apple)
- Samsung Galaxy S24 (Samsung)
- MacBook Pro M3 (Apple)
- Dell XPS 13 (Dell)
- AirPods Pro (Apple)

## ملاحظات

- جميع الأسعار بالدولار الأمريكي
- التقييمات من 0 إلى 5 نجوم
- يمكن البحث في الاسم والوصف والماركة
- الترقيم يبدأ من الصفحة 1
- الحد الأقصى للعناصر في الصفحة هو 100
