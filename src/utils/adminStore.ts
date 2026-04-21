/**
 * Admin Store - Manages admin account data
 * Note: Actual authentication happens on backend
 * This store is for managing admin metadata on the frontend
 */

export interface Admin {
  id: string;
  email: string;
  fullName: string;
  role: 'super_admin' | 'admin';
  createdAt: string;
  lastLogin: string | null;
  isActive: boolean;
}

const ADMINS_KEY = 'jayashree_admins';

/**
 * Get all admin accounts
 */
export function getAllAdmins(): Admin[] {
  try {
    const stored = localStorage.getItem(ADMINS_KEY);
    return stored ? JSON.parse(stored) : getDefaultAdmins();
  } catch (error) {
    console.error('Error loading admins:', error);
    return getDefaultAdmins();
  }
}

/**
 * Get admin by email
 */
export function getAdminByEmail(email: string): Admin | null {
  return getAllAdmins().find((admin) => admin.email === email) || null;
}

/**
 * Create new admin account
 */
export function createAdmin(
  email: string,
  fullName: string,
  role: 'super_admin' | 'admin' = 'admin'
): Admin {
  const now = new Date().toISOString();
  const admin: Admin = {
    id: Date.now().toString(),
    email,
    fullName,
    role,
    createdAt: now,
    lastLogin: null,
    isActive: true,
  };

  const allAdmins = getAllAdmins();
  allAdmins.push(admin);
  localStorage.setItem(ADMINS_KEY, JSON.stringify(allAdmins));
  return admin;
}

/**
 * Update admin
 */
export function updateAdmin(email: string, updates: Partial<Omit<Admin, 'id' | 'email' | 'createdAt'>>): Admin | null {
  const allAdmins = getAllAdmins();
  const index = allAdmins.findIndex((admin) => admin.email === email);
  if (index === -1) return null;

  allAdmins[index] = { ...allAdmins[index], ...updates };
  localStorage.setItem(ADMINS_KEY, JSON.stringify(allAdmins));
  return allAdmins[index];
}

/**
 * Delete admin
 */
export function deleteAdmin(email: string): boolean {
  const allAdmins = getAllAdmins();
  const filtered = allAdmins.filter((admin) => admin.email !== email);
  if (filtered.length === allAdmins.length) return false;

  localStorage.setItem(ADMINS_KEY, JSON.stringify(filtered));
  return true;
}

/**
 * Update last login time
 */
export function updateLastLogin(email: string): Admin | null {
  return updateAdmin(email, { lastLogin: new Date().toISOString() });
}

/**
 * Deactivate admin
 */
export function deactivateAdmin(email: string): Admin | null {
  return updateAdmin(email, { isActive: false });
}

/**
 * Activate admin
 */
export function activateAdmin(email: string): Admin | null {
  return updateAdmin(email, { isActive: true });
}

/**
 * Get default admin for initialization
 */
function getDefaultAdmins(): Admin[] {
  const now = new Date().toISOString();
  return [
    {
      id: '1',
      email: 'admin@foundation.org',
      fullName: 'Admin User',
      role: 'super_admin',
      createdAt: now,
      lastLogin: null,
      isActive: true,
    },
  ];
}
