import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'ngo' | 'panchayat' | 'government' | 'verifier';
  organization: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials
const demoUsers: { [key: string]: User } = {
  'admin@ecosangam.org': {
    id: '1',
    name: 'Admin User',
    email: 'admin@ecosangam.org',
    role: 'admin',
    organization: 'EcoSangam Platform'
  },
  'ngo@example.org': {
    id: '2',
    name: 'NGO Manager',
    email: 'ngo@example.org',
    role: 'ngo',
    organization: 'Green Earth NGO'
  },
  'panchayat@village.gov': {
    id: '3',
    name: 'Panchayat Officer',
    email: 'panchayat@village.gov',
    role: 'panchayat',
    organization: 'Sundarbans Panchayat'
  },
  'gov@environment.gov': {
    id: '4',
    name: 'Government Official',
    email: 'gov@environment.gov',
    role: 'government',
    organization: 'Ministry of Environment'
  },
  'verifier@carbon.org': {
    id: '5',
    name: 'Carbon Verifier',
    email: 'verifier@carbon.org',
    role: 'verifier',
    organization: 'Carbon Standards International'
  }
};

const demoPasswords: { [key: string]: string } = {
  'admin@ecosangam.org': 'admin123',
  'ngo@example.org': 'ngo123',
  'panchayat@village.gov': 'panchayat123',
  'gov@environment.gov': 'gov123',
  'verifier@carbon.org': 'verifier123'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user was previously logged in
    const savedUser = localStorage.getItem('ecosangam_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    if (demoUsers[email] && demoPasswords[email] === password) {
      const loggedInUser = demoUsers[email];
      setUser(loggedInUser);
      localStorage.setItem('ecosangam_user', JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecosangam_user');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};