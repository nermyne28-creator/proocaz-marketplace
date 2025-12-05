import { v2 as cloudinary } from 'cloudinary';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const hasCloudinaryConfig = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (hasCloudinaryConfig) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} else {
  console.warn('Cloudinary non configure. Les images seront stockees localement.');
}

// Local storage fallback
function saveToLocal(buffer, mimeType) {
  const uploadDir = join(process.cwd(), 'public', 'uploads');

  // Create uploads directory if it doesn't exist
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }

  // Determine file extension
  const ext = mimeType === 'image/png' ? 'png' :
    mimeType === 'image/webp' ? 'webp' : 'jpg';

  const filename = `${uuidv4()}.${ext}`;
  const filepath = join(uploadDir, filename);

  writeFileSync(filepath, buffer);

  // Return public URL
  return `/uploads/${filename}`;
}

export async function uploadToCloudinary(buffer, folder = 'occasync/listings', mimeType = 'image/jpeg') {
  // If Cloudinary not configured, use local storage
  if (!hasCloudinaryConfig) {
    console.log('Using local storage for image upload');
    return saveToLocal(buffer, mimeType);
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
        transformation: [
          { width: 1200, height: 900, crop: 'limit' },
          { quality: 'auto:good' },
        ],
      },
      (error, result) => {
        if (error) {
          // Fallback to local storage on Cloudinary error
          console.error('Cloudinary error, falling back to local:', error.message);
          try {
            const localUrl = saveToLocal(buffer, mimeType);
            resolve(localUrl);
          } catch (localError) {
            reject(localError);
          }
        } else {
          resolve(result.secure_url);
        }
      }
    );

    uploadStream.end(buffer);
  });
}

export async function deleteFromCloudinary(publicId) {
  if (!hasCloudinaryConfig) return false;
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    return false;
  }
}

export default cloudinary;
