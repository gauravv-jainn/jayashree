/**
 * Gallery Store - Manages gallery images separately from projects
 * Gallery items are standalone images with metadata (not full projects)
 */

export interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  uploadDate: string;
  createdBy: string; // admin email
  category: 'event' | 'project' | 'team' | 'community';
  tags: string[];
}

const GALLERY_KEY = 'jayashree_gallery';

/**
 * Get all gallery images
 */
export function getGalleryImages(): GalleryImage[] {
  try {
    const stored = localStorage.getItem(GALLERY_KEY);
    return stored ? JSON.parse(stored) : getDefaultGallery();
  } catch (error) {
    console.error('Error loading gallery:', error);
    return getDefaultGallery();
  }
}

/**
 * Get published gallery images (for public display)
 */
export function getPublishedGalleryImages(): GalleryImage[] {
  return getGalleryImages().sort((a, b) =>
    new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
  );
}

/**
 * Save a new gallery image
 */
export function saveGalleryImage(image: Omit<GalleryImage, 'id'>): GalleryImage {
  const images = getGalleryImages();
  const newImage: GalleryImage = {
    ...image,
    id: Date.now().toString(),
  };
  images.push(newImage);
  localStorage.setItem(GALLERY_KEY, JSON.stringify(images));
  return newImage;
}

/**
 * Update gallery image
 */
export function updateGalleryImage(id: string, updates: Partial<Omit<GalleryImage, 'id'>>): GalleryImage | null {
  const images = getGalleryImages();
  const index = images.findIndex(img => img.id === id);
  if (index === -1) return null;

  images[index] = { ...images[index], ...updates };
  localStorage.setItem(GALLERY_KEY, JSON.stringify(images));
  return images[index];
}

/**
 * Delete gallery image by ID
 */
export function deleteGalleryImage(id: string): boolean {
  const images = getGalleryImages();
  const filtered = images.filter(img => img.id !== id);
  if (filtered.length === images.length) return false; // Not found

  localStorage.setItem(GALLERY_KEY, JSON.stringify(filtered));
  return true;
}

/**
 * Delete images older than 1 year
 */
export function deleteOldImages(): number {
  const images = getGalleryImages();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const filtered = images.filter(img => {
    const uploadDate = new Date(img.uploadDate);
    return uploadDate > oneYearAgo;
  });

  const deletedCount = images.length - filtered.length;
  localStorage.setItem(GALLERY_KEY, JSON.stringify(filtered));
  return deletedCount;
}

/**
 * Get images by category
 */
export function getImagesByCategory(category: GalleryImage['category']): GalleryImage[] {
  return getGalleryImages().filter(img => img.category === category);
}

/**
 * Search gallery images
 */
export function searchGalleryImages(query: string): GalleryImage[] {
  const lowerQuery = query.toLowerCase();
  return getGalleryImages().filter(img =>
    img.title.toLowerCase().includes(lowerQuery) ||
    img.description.toLowerCase().includes(lowerQuery) ||
    img.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get default gallery with sample images
 */
function getDefaultGallery(): GalleryImage[] {
  return [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHl8ZW58MXx8fHwxNzc0NTUxMjkwfDA&ixlib=rb-4.0.3&q=80&w=1080',
      title: 'Community Gathering',
      description: 'Volunteers gathering for community service',
      uploadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdBy: 'admin@foundation.org',
      category: 'community',
      tags: ['gathering', 'volunteers', 'outdoor'],
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aHx8ZW58MXx8fHwxNzc0NTUxMjkwfDA&ixlib=rb-4.0.3&q=80&w=1080',
      title: 'Environmental Project',
      description: 'Tree planting initiative for environmental conservation',
      uploadDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      createdBy: 'admin@foundation.org',
      category: 'project',
      tags: ['environment', 'trees', 'conservation'],
    },
  ];
}
