/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Indian)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid
 */
export const isValidPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10;
};

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @returns {boolean} - True if valid
 */
export const isRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum length
 * @returns {boolean} - True if valid
 */
export const hasMinLength = (value, minLength) => {
  return value && value.length >= minLength;
};

/**
 * Validate maximum length
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum length
 * @returns {boolean} - True if valid
 */
export const hasMaxLength = (value, maxLength) => {
  return !value || value.length <= maxLength;
};

/**
 * Validate number range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} - True if valid
 */
export const isInRange = (value, min, max) => {
  const num = Number(value);
  return !isNaN(num) && num >= min && num <= max;
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate price
 * @param {number} price - Price to validate
 * @returns {boolean} - True if valid
 */
export const isValidPrice = (price) => {
  const num = Number(price);
  return !isNaN(num) && num >= 0;
};

/**
 * Validate stock count
 * @param {number} stock - Stock count to validate
 * @returns {boolean} - True if valid
 */
export const isValidStock = (stock) => {
  const num = Number(stock);
  return !isNaN(num) && num >= 0 && Number.isInteger(num);
};

/**
 * Validate rating (1-5)
 * @param {number} rating - Rating to validate
 * @returns {boolean} - True if valid
 */
export const isValidRating = (rating) => {
  return isInRange(rating, 1, 5) && Number.isInteger(Number(rating));
};

/**
 * Validate product data
 * @param {object} product - Product data to validate
 * @returns {object} - { valid: boolean, errors: string[] }
 */
export const validateProduct = (product) => {
  const errors = [];
  
  if (!isRequired(product.title)) {
    errors.push('Title is required');
  }
  
  if (!isRequired(product.brand)) {
    errors.push('Brand is required');
  }
  
  if (!isRequired(product.category)) {
    errors.push('Category is required');
  }
  
  if (!isValidPrice(product.price)) {
    errors.push('Valid price is required');
  }
  
  if (!isValidStock(product.stockCount)) {
    errors.push('Valid stock count is required');
  }
  
  if (!isRequired(product.featuredImage)) {
    errors.push('Featured image is required');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validate customer data
 * @param {object} customer - Customer data to validate
 * @returns {object} - { valid: boolean, errors: string[] }
 */
export const validateCustomer = (customer) => {
  const errors = [];
  
  if (!isRequired(customer.name)) {
    errors.push('Name is required');
  }
  
  if (!isRequired(customer.phone)) {
    errors.push('Phone is required');
  } else if (!isValidPhone(customer.phone)) {
    errors.push('Valid 10-digit phone number is required');
  }
  
  if (customer.email && !isValidEmail(customer.email)) {
    errors.push('Valid email is required');
  }
  
  if (!isRequired(customer.purchaseDate)) {
    errors.push('Purchase date is required');
  }
  
  if (!isRequired(customer.productId)) {
    errors.push('Product is required');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validate review data
 * @param {object} review - Review data to validate
 * @returns {object} - { valid: boolean, errors: string[] }
 */
export const validateReview = (review) => {
  const errors = [];
  
  if (!isRequired(review.customerName)) {
    errors.push('Name is required');
  }
  
  if (!isRequired(review.rating)) {
    errors.push('Rating is required');
  } else if (!isValidRating(review.rating)) {
    errors.push('Rating must be between 1 and 5');
  }
  
  if (!isRequired(review.comment)) {
    errors.push('Comment is required');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
};

export default {
  isValidEmail,
  isValidPhone,
  isRequired,
  hasMinLength,
  hasMaxLength,
  isInRange,
  isValidUrl,
  isValidPrice,
  isValidStock,
  isValidRating,
  validateProduct,
  validateCustomer,
  validateReview,
};