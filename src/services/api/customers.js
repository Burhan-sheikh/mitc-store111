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
import { addDays } from 'date-fns';

const CUSTOMERS_COLLECTION = 'customers';
const WARRANTY_DAYS = 15;

/**
 * Get all customers
 */
export const getCustomers = async (filters = {}) => {
  try {
    let q = collection(db, CUSTOMERS_COLLECTION);
    const constraints = [];

    if (filters.status) {
      constraints.push(where('status', '==', filters.status));
    }

    constraints.push(orderBy('purchaseDate', 'desc'));

    if (constraints.length > 0) {
      q = query(q, ...constraints);
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      purchaseDate: doc.data().purchaseDate?.toDate(),
      warrantyEndDate: doc.data().warrantyEndDate?.toDate(),
      createdAt: doc.data().createdAt?.toDate(),
    }));
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

/**
 * Get single customer by ID
 */
export const getCustomer = async (customerId) => {
  try {
    const docRef = doc(db, CUSTOMERS_COLLECTION, customerId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Customer not found');
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data(),
      purchaseDate: docSnap.data().purchaseDate?.toDate(),
      warrantyEndDate: docSnap.data().warrantyEndDate?.toDate(),
      createdAt: docSnap.data().createdAt?.toDate(),
    };
  } catch (error) {
    console.error('Error fetching customer:', error);
    throw error;
  }
};

/**
 * Create new customer
 */
export const createCustomer = async (customerData) => {
  try {
    const purchaseDate = new Date(customerData.purchaseDate);
    const warrantyEndDate = addDays(purchaseDate, WARRANTY_DAYS);

    const newCustomer = {
      name: customerData.name,
      phone: customerData.phone,
      email: customerData.email || '',
      purchaseDate: Timestamp.fromDate(purchaseDate),
      warrantyEndDate: Timestamp.fromDate(warrantyEndDate),
      productId: customerData.productId,
      productDetails: customerData.productDetails || {},
      notes: customerData.notes || '',
      status: 'Active',
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, CUSTOMERS_COLLECTION), newCustomer);
    return { id: docRef.id, ...newCustomer };
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

/**
 * Update customer
 */
export const updateCustomer = async (customerId, updates) => {
  try {
    const docRef = doc(db, CUSTOMERS_COLLECTION, customerId);
    
    // If purchase date is updated, recalculate warranty end date
    if (updates.purchaseDate) {
      const purchaseDate = new Date(updates.purchaseDate);
      updates.purchaseDate = Timestamp.fromDate(purchaseDate);
      updates.warrantyEndDate = Timestamp.fromDate(addDays(purchaseDate, WARRANTY_DAYS));
    }
    
    await updateDoc(docRef, updates);
    return { id: customerId, ...updates };
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
};

/**
 * Delete customer
 */
export const deleteCustomer = async (customerId) => {
  try {
    const docRef = doc(db, CUSTOMERS_COLLECTION, customerId);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};

/**
 * Update customer status based on warranty
 */
export const updateCustomerStatus = async (customerId) => {
  try {
    const customer = await getCustomer(customerId);
    const now = new Date();
    
    let status = customer.status;
    
    if (customer.warrantyEndDate < now) {
      status = 'Warranty Expired';
    }
    
    if (status !== customer.status) {
      await updateCustomer(customerId, { status });
    }
    
    return status;
  } catch (error) {
    console.error('Error updating customer status:', error);
    throw error;
  }
};

/**
 * Get customers with expiring warranties (within next N days)
 */
export const getExpiringWarranties = async (daysAhead = 3) => {
  try {
    const customers = await getCustomers({ status: 'Active' });
    const now = new Date();
    const futureDate = addDays(now, daysAhead);
    
    return customers.filter(customer => {
      const warrantyEnd = customer.warrantyEndDate;
      return warrantyEnd >= now && warrantyEnd <= futureDate;
    });
  } catch (error) {
    console.error('Error fetching expiring warranties:', error);
    throw error;
  }
};

/**
 * Get customers with expired warranties (for review requests)
 */
export const getExpiredWarranties = async () => {
  try {
    const customers = await getCustomers();
    const now = new Date();
    
    return customers.filter(customer => {
      return customer.warrantyEndDate < now && 
             customer.status !== 'Review Requested' &&
             customer.status !== 'Completed';
    });
  } catch (error) {
    console.error('Error fetching expired warranties:', error);
    throw error;
  }
};

export default {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  updateCustomerStatus,
  getExpiringWarranties,
  getExpiredWarranties,
  WARRANTY_DAYS,
};