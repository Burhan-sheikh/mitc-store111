import { useState } from 'react';
import { uploadToCloudinary, uploadMultipleToCloudinary, compressImage } from '../services/cloudinary';
import toast from 'react-hot-toast';

export const useCloudinaryUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadImage = async (file, shouldCompress = true) => {
    try {
      setUploading(true);
      setProgress(0);

      // Compress image if needed
      let fileToUpload = file;
      if (shouldCompress && file.type.startsWith('image/')) {
        toast.loading('Compressing image...');
        fileToUpload = await compressImage(file);
        toast.dismiss();
      }

      const url = await uploadToCloudinary(fileToUpload, (percent) => {
        setProgress(percent);
      });

      setUploading(false);
      setProgress(100);
      toast.success('Image uploaded successfully!');
      
      return url;
    } catch (error) {
      setUploading(false);
      setProgress(0);
      toast.error(error.message || 'Upload failed');
      throw error;
    }
  };

  const uploadMultiple = async (files, shouldCompress = true) => {
    try {
      setUploading(true);
      setProgress(0);

      const filesArray = Array.from(files);
      const totalFiles = filesArray.length;
      let completedFiles = 0;

      // Compress images if needed
      const filesToUpload = shouldCompress
        ? await Promise.all(
            filesArray.map(file => 
              file.type.startsWith('image/') ? compressImage(file) : Promise.resolve(file)
            )
          )
        : filesArray;

      const urls = await uploadMultipleToCloudinary(filesToUpload, (index, percent) => {
        if (percent === 100) {
          completedFiles++;
        }
        const overallProgress = Math.round((completedFiles / totalFiles) * 100);
        setProgress(overallProgress);
      });

      setUploading(false);
      setProgress(100);
      toast.success(`${totalFiles} images uploaded successfully!`);
      
      return urls;
    } catch (error) {
      setUploading(false);
      setProgress(0);
      toast.error(error.message || 'Upload failed');
      throw error;
    }
  };

  return {
    uploading,
    progress,
    uploadImage,
    uploadMultiple,
  };
};

export default useCloudinaryUpload;