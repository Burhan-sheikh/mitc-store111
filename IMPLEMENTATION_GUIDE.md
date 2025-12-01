# MITC Store - Implementation Guide

## ✅ What's Already Done

1. **Project Setup**
   - Package.json with all dependencies
   - Vite configuration with PWA support
   - Tailwind CSS configuration
   - Environment variables template

2. **Firebase & Cloudinary**
   - Firebase service configuration
   - Cloudinary upload utilities
   - Firestore security rules
   - Firestore indexes

3. **API Services**
   - Products API (CRUD, search, related products)
   - Customers API (warranty tracking)
   - Reviews API (approve/reject)
   - Settings API (site configuration)

4. **React Contexts**
   - AuthContext (authentication, roles)
   - SettingsContext (site settings)

5. **Custom Hooks**
   - useProducts, useCustomers, useReviews
   - useCloudinaryUpload

6. **Utilities**
   - Formatters (currency, date, phone)
   - Validators (product, customer, review)
   - Constants (categories, limits, routes)

7. **Basic App Structure**
   - main.jsx with providers
   - App.jsx with routing skeleton
   - LoadingScreen component

## 📋 What You Need to Implement

### 1. Complete Components

You need to create these component files:

**Shared Components** (`src/components/shared/`):
- `ErrorBoundary.jsx`
- `ProtectedRoute.jsx`
- `Modal.jsx`
- `ConfirmDialog.jsx`
- `Spinner.jsx`
- `EmptyState.jsx`

**Public Components** (`src/components/public/`):
- `PublicLayout.jsx`
- `PublicHeader.jsx`
- `PublicFooter.jsx`
- `ProductCard.jsx`
- `ProductGallery.jsx`
- `ContactModal.jsx`

**Admin Components** (`src/components/admin/`):
- `AdminLayout.jsx`
- `AdminHeader.jsx`
- `AdminSidebar.jsx`
- `ProductForm.jsx`
- `CustomerForm.jsx`
- `ImageUploader.jsx`

### 2. Complete Pages

**Public Pages** (`src/pages/public/`):
- `HomePage.jsx` - Homepage with sections
- `ProductsPage.jsx` - Product listing with filters
- `ProductDetailPage.jsx` - Product detail view
- `AboutPage.jsx`, `TermsPage.jsx`, `PrivacyPage.jsx`, `ContactPage.jsx`
- `LoginPage.jsx` - Admin login

**Admin Pages** (`src/pages/admin/`):
- `AdminDashboard.jsx` - Dashboard with stats
- `AdminProducts.jsx` - Product list table
- `AdminProductForm.jsx` - Create/edit product
- `AdminCustomers.jsx` - Customer list
- `AdminReviews.jsx` - Review moderation
- `AdminSettings.jsx` - Site settings

## 🚀 Quick Start

### Step 1: Install Dependencies
```bash
cd mitc-store111
npm install
```

### Step 2: Configure Environment

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Add your Firebase credentials:
   - Go to Firebase Console
   - Project Settings > General
   - Copy config values to `.env`

3. Add Cloudinary credentials:
   - Go to Cloudinary Dashboard
   - Settings > Upload
   - Create unsigned preset
   - Copy cloud name and preset to `.env`

### Step 3: Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create new project

2. **Enable Authentication**
   - Authentication > Sign-in method
   - Enable Email/Password

3. **Create Firestore Database**
   - Firestore Database > Create database
   - Start in production mode

4. **Deploy Security Rules**
```bash
firebase init firestore
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

5. **Create Admin User**
   - Authentication > Users > Add user
   - Email: admin@mitc.com (or your email)
   - Password: (set strong password)
   - Go to Firestore > users collection
   - Create document with ID = user UID
   - Set: `{ role: 'admin', email: 'admin@mitc.com' }`

### Step 4: Run Development Server
```bash
npm run dev
```

Open http://localhost:3000

## 📝 Implementation Examples

### Example: ProductCard Component

```jsx
// src/components/public/ProductCard.jsx
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.slug}`} className="card card-hover overflow-hidden">
      <img 
        src={product.featuredImage} 
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg">{product.title}</h3>
          {product.isNewArrival && (
            <span className="badge badge-primary">New</span>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
          {product.shortSlogan}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary-500">
            {formatCurrency(product.price)}
          </span>
          {product.isLimitedStock && (
            <span className="badge badge-warning">Limited</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
```

### Example: Simple Admin Product List

```jsx
// src/pages/admin/AdminProducts.jsx
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { formatCurrency } from '../../utils/formatters';
import { IoAdd } from 'react-icons/io5';

const AdminProducts = () => {
  const { products, loading } = useProducts();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link to="/admin/products/new" className="btn btn-primary flex items-center gap-2">
          <IoAdd /> Add Product
        </Link>
      </div>

      <div className="card">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-t">
                <td className="px-4 py-3">
                  <Link to={`/admin/products/${product.id}/edit`}>
                    {product.title}
                  </Link>
                </td>
                <td className="px-4 py-3">{formatCurrency(product.price)}</td>
                <td className="px-4 py-3">{product.stockCount}</td>
                <td className="px-4 py-3">
                  <span className={`badge ${product.published ? 'badge-success' : 'badge-gray'}`}>
                    {product.published ? 'Published' : 'Draft'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
```

## 📚 Full Component Templates

For complete component implementations, see the codebase. Key patterns:

1. **Use hooks for data**: `useProducts()`, `useCustomers()`, etc.
2. **Use formatters**: `formatCurrency()`, `formatDate()`
3. **Use validators**: Validate forms before submission
4. **Use toast notifications**: `toast.success()`, `toast.error()`
5. **Handle loading states**: Show spinners while fetching
6. **Handle errors**: Display user-friendly messages

## 🔧 Development Tips

1. **Start small**: Build one page at a time
2. **Test frequently**: Check each feature works
3. **Use React DevTools**: Debug state and props
4. **Check console**: Fix warnings and errors
5. **Mobile first**: Test responsive design
6. **Use TypeScript** (optional): Add type safety

## 🚀 Deployment

### Deploy to Netlify
```bash
netlify deploy --prod
```

### Deploy to Vercel
```bash
vercel --prod
```

### Deploy to Firebase Hosting
```bash
firebase init hosting
firebase deploy --only hosting
```

## 🐛 Troubleshooting

**Firebase errors**: Check `.env` credentials
**Cloudinary errors**: Check upload preset is unsigned
**Auth errors**: Ensure admin user exists with correct role
**Build errors**: Run `npm install` again
**Routing errors**: Check route paths match

## 📞 Support

For issues, check:
1. README.md
2. Firebase docs
3. React Router docs
4. Tailwind CSS docs

---

**Happy Coding! 🚀**