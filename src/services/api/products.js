import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

const PRODUCTS_COLLECTION = 'products';
const MAX_PRODUCTS = 80;

/**
 * Get all products (with optional filters)
 */
export const getProducts = async (filters = {}) => {
  try {
    let q = collection(db, PRODUCTS_COLLECTION);
    const constraints = [];

    // Apply filters
    if (filters.published !== undefined) {
      constraints.push(where('published', '==', filters.published));
    }
    if (filters.category) {
      constraints.push(where('category', '==', filters.category));
    }
    if (filters.brand) {
      constraints.push(where('brand', '==', filters.brand));
    }
    if (filters.isNewArrival) {
      constraints.push(where('isNewArrival', '==', true));
    }
    if (filters.isLimitedStock) {
      constraints.push(where('isLimitedStock', '==', true));
    }
    if (filters.isDeal) {
      constraints.push(where('isDeal', '==', true));
    }
    if (filters.isTopHighlight) {
      constraints.push(where('isTopHighlight', '==', true));
    }
    if (filters.isBottomHighlight) {
      constraints.push(where('isBottomHighlight', '==', true));
    }

    // Add ordering
    constraints.push(orderBy('createdAt', 'desc'));

    // Add limit if specified
    if (filters.limit) {
      constraints.push(limit(filters.limit));
    }

    q = query(q, ...constraints);
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Get single product by ID
 */
export const getProduct = async (productId) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, productId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Product not found');
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt?.toDate(),
      updatedAt: docSnap.data().updatedAt?.toDate(),
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

/**
 * Get product by slug
 */
export const getProductBySlug = async (slug) => {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('slug', '==', slug),
      limit(1)
    );
    
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      throw new Error('Product not found');
    }
    
    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    };
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    throw error;
  }
};

/**
 * Create new product
 */
export const createProduct = async (productData) => {
  try {
    // Check product limit
    const allProducts = await getProducts();
    if (allProducts.length >= MAX_PRODUCTS) {
      throw new Error(`Maximum product limit (${MAX_PRODUCTS}) reached`);
    }

    const newProduct = {
      ...productData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), newProduct);
    return { id: docRef.id, ...newProduct };
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

/**
 * Update existing product
 */
export const updateProduct = async (productId, updates) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, productId);
    const updateData = {
      ...updates,
      updatedAt: serverTimestamp(),
    };
    
    await updateDoc(docRef, updateData);
    return { id: productId, ...updateData };
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

/**
 * Delete product
 */
export const deleteProduct = async (productId) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, productId);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

/**
 * Duplicate product
 */
export const duplicateProduct = async (productId) => {
  try {
    const original = await getProduct(productId);
    
    // Remove id and update metadata
    const { id, createdAt, updatedAt, ...productData } = original;
    
    const duplicated = {
      ...productData,
      title: `${productData.title} (Copy)`,
      slug: `${productData.slug}-copy-${Date.now()}`,
      published: false, // Unpublish by default
    };
    
    return await createProduct(duplicated);
  } catch (error) {
    console.error('Error duplicating product:', error);
    throw error;
  }
};

/**
 * Search products by title, brand, model, or tags
 */
export const searchProducts = async (searchTerm, filters = {}) => {
  try {
    // Get all products first (Firestore doesn't support full-text search natively)
    const products = await getProducts(filters);
    
    // Filter by search term
    const searchLower = searchTerm.toLowerCase();
    return products.filter(product => {
      return (
        product.title?.toLowerCase().includes(searchLower) ||
        product.brand?.toLowerCase().includes(searchLower) ||
        product.model?.toLowerCase().includes(searchLower) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    });
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

/**
 * Get related products (same brand or category)
 */
export const getRelatedProducts = async (productId, limitCount = 4) => {
  try {
    const product = await getProduct(productId);
    
    // Get products with same brand or category
    const relatedQuery = query(
      collection(db, PRODUCTS_COLLECTION),
      where('published', '==', true),
      where('brand', '==', product.brand),
      limit(limitCount + 1) // +1 to exclude current product
    );
    
    const snapshot = await getDocs(relatedQuery);
    const related = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(p => p.id !== productId) // Exclude current product
      .slice(0, limitCount);
    
    return related;
  } catch (error) {
    console.error('Error fetching related products:', error);
    throw error;
  }
};

/**
 * Generate unique slug from title
 */
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single
};

export default {
  getProducts,
  getProduct,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  duplicateProduct,
  searchProducts,
  getRelatedProducts,
  generateSlug,
  MAX_PRODUCTS,
};