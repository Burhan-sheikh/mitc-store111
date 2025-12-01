import axios from 'axios';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Upload image to Cloudinary
 * @param {File} file - Image file to upload
 * @param {Function} onProgress - Progress callback (0-100)
 * @returns {Promise<string>} - Cloudinary URL
 */
export const uploadToCloudinary = async (file, onProgress = null) => {
  if (!file) throw new Error('No file provided');
  
  // Validate file size (max 5MB for images, 10MB for others)
  const maxSize = file.type.startsWith('image/') ? 5 * 1024 * 1024 : 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error(`File too large. Maximum size: ${maxSize / 1024 / 1024}MB`);
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('cloud_name', CLOUD_NAME);
  
  // Add folder for organization
  formData.append('folder', 'mitc-store');

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        },
      }
    );

    return response.data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(error.response?.data?.error?.message || 'Upload failed');
  }
};

/**
 * Upload multiple images to Cloudinary
 * @param {FileList|Array<File>} files - Array of image files
 * @param {Function} onProgress - Progress callback for each file
 * @returns {Promise<Array<string>>} - Array of Cloudinary URLs
 */
export const uploadMultipleToCloudinary = async (files, onProgress = null) => {
  const filesArray = Array.from(files);
  const uploadPromises = filesArray.map((file, index) => {
    return uploadToCloudinary(file, (percent) => {
      if (onProgress) {
        onProgress(index, percent);
      }
    });
  });

  return Promise.all(uploadPromises);
};

/**
 * Get optimized image URL from Cloudinary
 * @param {string} url - Original Cloudinary URL
 * @param {object} options - Transformation options
 * @returns {string} - Optimized URL
 */
export const getOptimizedImageUrl = (url, options = {}) => {
  if (!url || !url.includes('cloudinary.com')) return url;

  const {
    width = 'auto',
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
  } = options;

  const transformations = `w_${width},q_${quality},f_${format},c_${crop},g_${gravity}`;
  
  // Insert transformations into URL
  return url.replace('/upload/', `/upload/${transformations}/`);
};

/**
 * Delete image from Cloudinary (requires backend)
 * Note: Direct deletion from client is not possible with unsigned uploads
 * This should be handled by a backend function
 */
export const deleteFromCloudinary = async (publicId) => {
  console.warn('Delete operation requires backend implementation');
  // This would typically call your backend API
  // Backend would use Cloudinary Admin API to delete
  return { message: 'Delete requires backend implementation' };
};

/**
 * Extract public ID from Cloudinary URL
 * @param {string} url - Cloudinary URL
 * @returns {string} - Public ID
 */
export const getPublicIdFromUrl = (url) => {
  if (!url || !url.includes('cloudinary.com')) return null;
  
  const parts = url.split('/');
  const uploadIndex = parts.indexOf('upload');
  
  if (uploadIndex === -1) return null;
  
  // Get everything after 'upload' and transformation params
  const pathParts = parts.slice(uploadIndex + 1);
  
  // Remove version (v1234567890) if present
  const filteredParts = pathParts.filter(part => !part.startsWith('v'));
  
  // Join and remove file extension
  const publicId = filteredParts.join('/').replace(/\.[^/.]+$/, '');
  
  return publicId;
};

/**
 * Compress image before upload (client-side)
 * @param {File} file - Image file
 * @param {number} maxWidth - Maximum width
 * @param {number} quality - Quality (0-1)
 * @returns {Promise<File>} - Compressed file
 */
export const compressImage = (file, maxWidth = 1920, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      resolve(file); // Not an image, return as is
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          file.type,
          quality
        );
      };
      
      img.onerror = reject;
    };
    
    reader.onerror = reject;
  });
};

export default {
  uploadToCloudinary,
  uploadMultipleToCloudinary,
  getOptimizedImageUrl,
  deleteFromCloudinary,
  getPublicIdFromUrl,
  compressImage,
};