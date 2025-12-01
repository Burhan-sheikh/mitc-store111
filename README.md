# MITC Store - Premium Laptop Showroom

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.13-orange.svg)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-green.svg)](https://web.dev/progressive-web-apps/)

A premium showroom-style web application for **Mateen IT Corp. (MITC)** to showcase in-store laptop inventory. Built with modern web technologies for exceptional performance and user experience.

## ✨ Features

### Public Site
- 🏠 **Beautiful Homepage** with dynamic sections (Highlights, Deals, New Arrivals, Limited Stock)
- 🔍 **Advanced Product Search & Filtering** (brand, category, price, tags)
- 📱 **Fully Responsive Design** - optimized for mobile, tablet, and desktop
- 🖼️ **Product Gallery** with image slider and detailed specifications
- 💬 **Easy Contact Options** - WhatsApp, Instagram, Email, Phone
- ⭐ **Customer Reviews** display
- 📄 **Static Pages** - About, Terms, Privacy Policy, Contact

### Admin Dashboard
- 👥 **Customer Management** - 15-day warranty tracking, review requests
- 📦 **Product Management** - Create, edit, duplicate, delete products (max 80)
- 🖼️ **Media Management** - Cloudinary integration with image optimization
- ⭐ **Review Management** - Approve/reject store reviews
- ⚙️ **Site Settings** - Branding, pages, social links, Cloudinary config
- 📊 **Dashboard Analytics** - Quick stats and insights

### Technical Features
- 🔐 **Firebase Authentication** - Role-based access (admin/customer)
- 🗄️ **Firestore Database** - Real-time data sync
- ☁️ **Cloudinary CDN** - Fast image delivery with automatic optimization
- 📱 **PWA Support** - Installable on Android (web + Play Store wrapper ready)
- ⚡ **Optimized Performance** - Code splitting, lazy loading, caching
- 🎨 **Modern UI** - Tailwind CSS with custom design system

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Firebase project ([console.firebase.google.com](https://console.firebase.google.com))
- Cloudinary account ([cloudinary.com](https://cloudinary.com))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Burhan-sheikh/mitc-store111.git
cd mitc-store111
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure Environment Variables**
```bash
cp .env.example .env
```

Edit `.env` and add your Firebase and Cloudinary credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset

VITE_ADMIN_EMAIL=admin@mitc.com
```

4. **Set up Firebase**
   - Enable **Email/Password** authentication
   - Create Firestore database
   - Deploy Firestore security rules (see `/firestore.rules`)
   - Create admin user with email from `VITE_ADMIN_EMAIL`

5. **Set up Cloudinary**
   - Create an unsigned upload preset
   - Set upload preset name in `.env`

6. **Start development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
mitc-store111/
├── public/                 # Static assets
│   ├── pwa-192x192.png    # PWA icons
│   └── pwa-512x512.png
├── src/
│   ├── components/        # Reusable components
│   │   ├── admin/        # Admin-specific components
│   │   ├── public/       # Public site components
│   │   └── shared/       # Shared components
│   ├── contexts/         # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── SettingsContext.jsx
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Route pages
│   │   ├── admin/       # Admin pages
│   │   └── public/      # Public pages
│   ├── services/         # API and service functions
│   │   ├── firebase.js
│   │   ├── cloudinary.js
│   │   └── api/
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── firestore.rules       # Firestore security rules
├── firestore.indexes.json # Firestore indexes
├── .env.example          # Environment template
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎯 Usage

### Admin Access
1. Navigate to `/admin` or `/login`
2. Sign in with admin credentials
3. Access dashboard modules:
   - **Products**: Manage inventory (max 80 products)
   - **Customers**: Track warranties and reviews
   - **Reviews**: Moderate customer feedback
   - **Settings**: Configure site branding and pages

### Product Limits by Section
- Top Highlight Bar: **10 items**
- Deals Banner: **10 items**
- New Arrivals: **10 items**
- Limited Stock: **10 items**
- Category Grid (Premium/Standard/Basic): **30 items**
- Bottom Highlight Bar: **10 items**
- **Total Products**: **80 max**

### Customer Warranty Flow
1. Admin adds customer with purchase date
2. System calculates warranty end date (purchase date + 15 days)
3. Admin can send:
   - Warranty reminders (before expiry)
   - Review requests (after expiry)

## 🔒 Security

### Firestore Rules
- Public read access for published products and approved reviews
- Admin-only write access for all collections
- Customer data protected (admin + owner access only)

### Best Practices
- Never commit `.env` file
- Use environment variables for all sensitive data
- Implement rate limiting for contact forms
- Validate all user inputs
- Use Cloudinary signed uploads for production

## 📱 PWA Installation

### Web Browser (Android/Desktop)
1. Visit the site
2. Look for "Install App" prompt or browser menu
3. Click "Install" or "Add to Home Screen"

### Play Store (Future)
1. Wrap PWA using [Trusted Web Activity](https://developer.chrome.com/docs/android/trusted-web-activity/)
2. Submit to Google Play Store

## 🎨 Customization

### Branding
Update via Admin Dashboard → Site Settings → Branding:
- Logo (Cloudinary upload)
- Slogan/Tagline
- Colors (edit `tailwind.config.js` for theme)
- Social media links

### Content Pages
Edit via Admin Dashboard → Site Settings → Pages:
- About
- Terms & Conditions
- Privacy Policy
- Contact

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Deploy to Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Deploy
firebase deploy --only hosting
```

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router v6
- **Styling**: Tailwind CSS 3.4
- **Backend**: Firebase (Auth + Firestore)
- **Media**: Cloudinary CDN
- **Build Tool**: Vite 5
- **PWA**: vite-plugin-pwa
- **Icons**: React Icons
- **Notifications**: react-hot-toast
- **Date Handling**: date-fns
- **Rich Text**: React Quill
- **Charts**: Recharts

## 📞 Support & Contact

- **Store**: MITC Store, Maisuma, Srinagar, Kashmir
- **Developer**: Burhan Sheikh
- **GitHub**: [github.com/Burhan-sheikh/mitc-store111](https://github.com/Burhan-sheikh/mitc-store111)
- **Issues**: [Submit an issue](https://github.com/Burhan-sheikh/mitc-store111/issues)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Firebase for backend infrastructure
- Cloudinary for media management
- Tailwind CSS for styling system
- React community for amazing tools

---

**Built with ❤️ for Mateen IT Corp. | Premium Laptops in Kashmir**