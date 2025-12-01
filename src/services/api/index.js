// Central export for all API services
export * from './products';
export * from './customers';
export * from './reviews';
export * from './settings';

// Re-export services as named exports
import products from './products';
import customers from './customers';
import reviews from './reviews';
import settings from './settings';

export { products, customers, reviews, settings };