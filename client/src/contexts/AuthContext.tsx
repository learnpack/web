import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  roles: Array<{
    academy: {
      id: number;
      slug: string;
      name: string;
    };
    role: {
      slug: string;
      name: string;
    };
  }>;
  permissions: Array<{
    codename: string;
    name: string;
  }>;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasWebmasterAccess: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // LearnPack Academy ID - configurable via environment variable
  const LEARNPACK_ACADEMY_ID = parseInt(import.meta.env.VITE_BREATHCODE_ACADEMY_ID || '54');

  useEffect(() => {
    // Check for existing token on mount
    const savedToken = localStorage.getItem('auth_token');
    if (savedToken) {
      fetchUser(savedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUser = async (authToken: string) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Token ${authToken}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setToken(authToken);
      } else {
        // Invalid token, clear it
        localStorage.removeItem('auth_token');
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      localStorage.removeItem('auth_token');
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('auth_token', data.token);
    await fetchUser(data.token);
  };

  const logout = async () => {
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token}`
          }
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    localStorage.removeItem('auth_token');
    setUser(null);
    setToken(null);
  };

  const hasWebmasterAccess = (): boolean => {
    if (!user) return false;

    // Check if user has webmaster capability for LearnPack academy
    const hasWebmasterPermission = user.permissions.some(
      p => p.codename === 'webmaster'
    );

    // Check if user belongs to LearnPack academy
    const belongsToLearnPack = user.roles.some(
      r => r.academy.id === LEARNPACK_ACADEMY_ID
    );

    return hasWebmasterPermission && belongsToLearnPack;
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, hasWebmasterAccess }}>
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
