import { env } from './env';

/**
 * Gets the full URL for an image in the public folder
 * @param imagePath - The path of the image relative to the public folder (e.g., "/avatar.jpg")
 * @returns The full URL for the image
 */
export const getPublicImageUrl = (imagePath: string): string => {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
  
  // Always use the base URL
  return `${env.PUBLIC_URL}/${cleanPath}`;
}; 