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
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

const REVIEWS_COLLECTION = 'storeReviews';

/**
 * Get all store reviews
 */
export const getReviews = async (filters = {}) => {
  try {
    let q = collection(db, REVIEWS_COLLECTION);
    const constraints = [];

    if (filters.status) {
      constraints.push(where('status', '==', filters.status));
    }

    constraints.push(orderBy('createdAt', 'desc'));

    if (constraints.length > 0) {
      q = query(q, ...constraints);
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    }));
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

/**
 * Get approved reviews (for public display)
 */
export const getApprovedReviews = async () => {
  return getReviews({ status: 'Approved' });
};

/**
 * Get single review
 */
export const getReview = async (reviewId) => {
  try {
    const docRef = doc(db, REVIEWS_COLLECTION, reviewId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Review not found');
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt?.toDate(),
    };
  } catch (error) {
    console.error('Error fetching review:', error);
    throw error;
  }
};

/**
 * Create new review
 */
export const createReview = async (reviewData) => {
  try {
    const newReview = {
      customerName: reviewData.customerName,
      rating: reviewData.rating,
      title: reviewData.title || '',
      comment: reviewData.comment,
      status: 'Pending',
      source: reviewData.source || 'Manual',
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, REVIEWS_COLLECTION), newReview);
    return { id: docRef.id, ...newReview };
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

/**
 * Update review (mainly for approval/rejection)
 */
export const updateReview = async (reviewId, updates) => {
  try {
    const docRef = doc(db, REVIEWS_COLLECTION, reviewId);
    await updateDoc(docRef, updates);
    return { id: reviewId, ...updates };
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};

/**
 * Approve review
 */
export const approveReview = async (reviewId) => {
  return updateReview(reviewId, { status: 'Approved' });
};

/**
 * Reject review
 */
export const rejectReview = async (reviewId) => {
  return updateReview(reviewId, { status: 'Rejected' });
};

/**
 * Delete review
 */
export const deleteReview = async (reviewId) => {
  try {
    const docRef = doc(db, REVIEWS_COLLECTION, reviewId);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};

/**
 * Get review statistics
 */
export const getReviewStats = async () => {
  try {
    const reviews = await getApprovedReviews();
    
    const stats = {
      total: reviews.length,
      averageRating: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    };
    
    if (reviews.length === 0) return stats;
    
    let totalRating = 0;
    reviews.forEach(review => {
      totalRating += review.rating;
      stats.ratingDistribution[review.rating]++;
    });
    
    stats.averageRating = (totalRating / reviews.length).toFixed(1);
    
    return stats;
  } catch (error) {
    console.error('Error calculating review stats:', error);
    throw error;
  }
};

export default {
  getReviews,
  getApprovedReviews,
  getReview,
  createReview,
  updateReview,
  approveReview,
  rejectReview,
  deleteReview,
  getReviewStats,
};