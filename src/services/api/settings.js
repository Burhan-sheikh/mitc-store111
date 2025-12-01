import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

const SETTINGS_COLLECTION = 'siteSettings';
const PAGES_COLLECTION = 'pages';
const SETTINGS_DOC_ID = 'main';

/**
 * Get site settings
 */
export const getSettings = async () => {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      // Return default settings if not found
      return getDefaultSettings();
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
};

/**
 * Update site settings
 */
export const updateSettings = async (updates) => {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
    
    // Check if document exists
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      // Create with defaults + updates
      const defaultSettings = getDefaultSettings();
      await setDoc(docRef, {
        ...defaultSettings,
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Update existing
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};

/**
 * Get default settings structure
 */
export const getDefaultSettings = () => {
  return {
    branding: {
      logo: '',
      slogan: 'Premium Laptops in Kashmir',
      phone: '',
      address: 'Maisuma, Near Gaw Kadal Bridge, Srinagar',
      email: '',
    },
    social: {
      whatsapp: '',
      instagram: '',
      facebook: '',
      youtube: '',
      twitter: '',
    },
    cloudinary: {
      cloudName: '',
      apiKey: '',
      folder: 'mitc-store',
    },
    contactTemplates: [
      "Hi, I'm interested in {productTitle}. Is it available?",
      "Can I get more details about {productTitle}?",
      "What's the final price for {productTitle}?",
      "Is {productTitle} still in stock?",
      "Can I visit the store to see {productTitle}?",
      "Do you offer any warranty on {productTitle}?",
      "Can you send more photos of {productTitle}?",
      "What are the payment options for {productTitle}?",
      "Is there any discount on {productTitle}?",
      "Can you hold {productTitle} for me?",
    ],
    warrantyTemplates: {
      reminder: "Hi {customerName}, your warranty for {productTitle} expires on {warrantyEndDate}. Please contact us if you need any assistance.",
      expired: "Hi {customerName}, your warranty for {productTitle} has expired. We hope you're enjoying your purchase! Please share your experience.",
      reviewRequest: "Hi {customerName}, we'd love to hear about your experience with {productTitle}. Please leave us a review!",
    },
  };
};

/**
 * Get page content
 */
export const getPage = async (pageId) => {
  try {
    const docRef = doc(db, PAGES_COLLECTION, pageId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return getDefaultPage(pageId);
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  } catch (error) {
    console.error('Error fetching page:', error);
    throw error;
  }
};

/**
 * Update page content
 */
export const updatePage = async (pageId, content) => {
  try {
    const docRef = doc(db, PAGES_COLLECTION, pageId);
    
    await setDoc(docRef, {
      ...content,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating page:', error);
    throw error;
  }
};

/**
 * Get default page content
 */
export const getDefaultPage = (pageId) => {
  const defaults = {
    about: {
      id: 'about',
      title: 'About MITC Store',
      content: 'Welcome to Mateen IT Corp. - your trusted source for premium laptops in Kashmir.',
      featuredImage: '',
    },
    terms: {
      id: 'terms',
      title: 'Terms and Conditions',
      content: 'Please read these terms and conditions carefully before using our services.',
      featuredImage: '',
    },
    privacy: {
      id: 'privacy',
      title: 'Privacy Policy',
      content: 'Your privacy is important to us. This policy explains how we handle your information.',
      featuredImage: '',
    },
    contact: {
      id: 'contact',
      title: 'Contact Us',
      content: 'Get in touch with us for any inquiries about our products and services.',
      featuredImage: '',
    },
  };
  
  return defaults[pageId] || { id: pageId, title: '', content: '', featuredImage: '' };
};

export default {
  getSettings,
  updateSettings,
  getDefaultSettings,
  getPage,
  updatePage,
  getDefaultPage,
};