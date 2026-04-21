import React, { createContext, useContext, useState, useEffect } from 'react';

interface Admin {
  id: string;
  email: string;
  fullName: string;
  role: 'super_admin' | 'admin';
}

interface AuthContextType {
  isAuthenticated: boolean;
  admin: Admin | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const adminData = localStorage.getItem('admin_data');

    if (token && adminData) {
      try {
        const parsedAdmin = JSON.parse(adminData);
        setAdmin(parsedAdmin);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse admin data:', error);
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_data');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      // Demo credentials for testing
      if (email === 'admin@foundation.org' && password === 'password123') {
        const demoAdmin: Admin = {
          id: '1',
          email: 'admin@foundation.org',
          fullName: 'Admin User',
          role: 'super_admin',
        };

        const demoToken = 'demo_token_' + Date.now();

        // Store in localStorage
        localStorage.setItem('admin_token', demoToken);
        localStorage.setItem('admin_data', JSON.stringify(demoAdmin));

        setAdmin(demoAdmin);
        setIsAuthenticated(true);
        return;
      }

      // Try backend authentication
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();

          // Store token and admin data
          localStorage.setItem('admin_token', data.token);
          localStorage.setItem('admin_data', JSON.stringify(data.admin));

          setAdmin(data.admin);
          setIsAuthenticated(true);
          return;
        }
      } catch (backendError) {
        console.warn('Backend login failed, falling back to demo mode:', backendError);
      }

      throw new Error('Invalid email or password');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_data');
    setAdmin(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, admin, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
