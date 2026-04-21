/**
 * Location Store - Manages organization location and contact information
 */

export interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  phone: string;
  whatsapp: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedin: string;
    email: string;
  };
}

const LOCATION_KEY = 'jayashree_location';

/**
 * Get location data
 */
export function getLocationData(): LocationData {
  try {
    const stored = localStorage.getItem(LOCATION_KEY);
    return stored ? JSON.parse(stored) : getDefaultLocation();
  } catch (error) {
    console.error('Error loading location:', error);
    return getDefaultLocation();
  }
}

/**
 * Update location data
 */
export function updateLocationData(updates: Partial<LocationData>): LocationData {
  const current = getLocationData();
  const updated = { ...current, ...updates };
  localStorage.setItem(LOCATION_KEY, JSON.stringify(updated));
  return updated;
}

/**
 * Get default location data
 */
function getDefaultLocation(): LocationData {
  return {
    latitude: 19.0760,
    longitude: 72.8777,
    address: 'Mumbai, Maharashtra, India',
    phone: '+91-9876543210',
    whatsapp: '919876543210',
    socialLinks: {
      facebook: 'https://facebook.com/jayashreefoundation',
      twitter: 'https://twitter.com/jayashreefdn',
      linkedin: 'https://linkedin.com/company/jayashree-foundation',
      email: 'contact@foundation.org',
    },
  };
}
