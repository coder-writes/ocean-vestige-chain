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

// Demo credentials for India Blue Carbon Platform
const demoUsers: { [key: string]: User } = {
  'admin@ecosangam.in': {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    email: 'admin@ecosangam.in',
    role: 'admin',
    organization: 'EcoSangam India Platform'
  },
  'ngo@mangrovealliance.org': {
    id: '2',
    name: 'Priya Sharma',
    email: 'ngo@mangrovealliance.org',
    role: 'ngo',
    organization: 'India Mangrove Alliance'
  },
  'panchayat@sundarbans.gov.in': {
    id: '3',
    name: 'Amit Mondal',
    email: 'panchayat@sundarbans.gov.in',
    role: 'panchayat',
    organization: 'Sundarbans Panchayat'
  },
  'gov@moef.gov.in': {
    id: '4',
    name: 'Dr. Meera Nair',
    email: 'gov@moef.gov.in',
    role: 'government',
    organization: 'Ministry of Environment, Forest & Climate Change'
  },
  'verifier@qci.org.in': {
    id: '5',
    name: 'Dr. Suresh Patel',
    email: 'verifier@qci.org.in',
    role: 'verifier',
    organization: 'Quality Council of India'
  }
};

const demoPasswords: { [key: string]: string } = {
  'admin@ecosangam.in': 'admin123',
  'ngo@mangrovealliance.org': 'ngo123',
  'panchayat@sundarbans.gov.in': 'panchayat123',
  'gov@moef.gov.in': 'gov123',
  'verifier@qci.org.in': 'verifier123'
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