// Product limits by section
export const PRODUCT_LIMITS = {
  TOTAL: 80,
  TOP_HIGHLIGHT: 10,
  DEALS: 10,
  NEW_ARRIVALS: 10,
  LIMITED_STOCK: 10,
  CATEGORY_GRID: 30,
  BOTTOM_HIGHLIGHT: 10,
};

// Product categories
export const CATEGORIES = {
  PREMIUM: 'Premium',
  STANDARD: 'Standard',
  BASIC: 'Basic',
  NEW: 'New',
  LIMITED: 'Limited',
  DEAL: 'Deal',
  TOP_HIGHLIGHT: 'HighlightTop',
  BOTTOM_HIGHLIGHT: 'HighlightBottom',
};

// Product conditions
export const CONDITIONS = {
  NEW: 'New',
  LIKE_NEW: 'Like New',
  USED: 'Used',
  REFURBISHED: 'Refurbished',
};

// Customer status
export const CUSTOMER_STATUS = {
  ACTIVE: 'Active',
  WARRANTY_EXPIRED: 'Warranty Expired',
  REVIEW_REQUESTED: 'Review Requested',
  COMPLETED: 'Completed',
};

// Review status
export const REVIEW_STATUS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
};

// Warranty duration (days)
export const WARRANTY_DAYS = 15;

// Image upload limits
export const IMAGE_LIMITS = {
  MAX_SIZE_MB: 5,
  MAX_SIZE_BYTES: 5 * 1024 * 1024,
  MAX_GALLERY_IMAGES: 10,
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
};

// Firebase collection names
export const COLLECTIONS = {
  PRODUCTS: 'products',
  CUSTOMERS: 'customers',
  REVIEWS: 'storeReviews',
  USERS: 'users',
  SETTINGS: 'siteSettings',
  PAGES: 'pages',
};

// Routes
export const ROUTES = {
  // Public routes
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:slug',
  ABOUT: '/about',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  CONTACT: '/contact',
  LOGIN: '/login',
  
  // Admin routes
  ADMIN: '/admin',
  ADMIN_CUSTOMERS: '/admin/customers',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_PRODUCTS_NEW: '/admin/products/new',
  ADMIN_PRODUCTS_EDIT: '/admin/products/:id/edit',
  ADMIN_REVIEWS: '/admin/store-reviews',
  ADMIN_SETTINGS: '/admin/site-settings',
};

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'mitc_theme',
  USER_PREFERENCES: 'mitc_user_preferences',
};

export default {
  PRODUCT_LIMITS,
  CATEGORIES,
  CONDITIONS,
  CUSTOMER_STATUS,
  REVIEW_STATUS,
  WARRANTY_DAYS,
  IMAGE_LIMITS,
  PAGINATION,
  COLLECTIONS,
  ROUTES,
  STORAGE_KEYS,
};