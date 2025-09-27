import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, Shield, Building, Users, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [selectedDemo, setSelectedDemo] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const demoAccounts = [
    {
      email: 'admin@ecosangam.org',
      password: 'admin123',
      role: 'Admin',
      organization: 'EcoSangam Platform',
      icon: <Shield className="w-4 h-4" />,
      color: 'bg-red-500'
    },
    {
      email: 'ngo@example.org',
      password: 'ngo123',
      role: 'NGO',
      organization: 'Green Earth NGO',
      icon: <Leaf className="w-4 h-4" />,
      color: 'bg-forest'
    },
    {
      email: 'panchayat@village.gov',
      password: 'panchayat123',
      role: 'Panchayat',
      organization: 'Sundarbans Panchayat',
      icon: <Users className="w-4 h-4" />,
      color: 'bg-ocean'
    },
    {
      email: 'gov@environment.gov',
      password: 'gov123',
      role: 'Government',
      organization: 'Ministry of Environment',
      icon: <Building className="w-4 h-4" />,
      color: 'bg-purple-500'
    },
    {
      email: 'verifier@carbon.org',
      password: 'verifier123',
      role: 'Verifier',
      organization: 'Carbon Standards International',
      icon: <CheckCircle className="w-4 h-4" />,
      color: 'bg-emerald-500'
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (login(email, password)) {
      navigate('/');
    } else {
      setError('Invalid credentials. Please use demo accounts below.');
    }
  };

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setSelectedDemo(demoEmail);
    
    if (login(demoEmail, demoPassword)) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean via-ocean-light to-forest flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
        {/* Login Form */}
        <Card className="w-full shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Leaf className="w-8 h-8 text-forest" />
              <h1 className="text-2xl font-bold text-forest">EcoSangam</h1>
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your Blue Carbon MRV account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              <Button type="submit" className="w-full bg-ocean hover:bg-ocean-dark">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="w-full shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl">Demo Accounts</CardTitle>
            <CardDescription>
              Click any account below to auto-login with demo credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoAccounts.map((account) => (
              <div
                key={account.email}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedDemo === account.email ? 'ring-2 ring-ocean' : ''
                }`}
                onClick={() => handleDemoLogin(account.email, account.password)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${account.color} text-white`}>
                      {account.icon}
                    </div>
                    <div>
                      <div className="font-semibold">{account.role}</div>
                      <div className="text-sm text-muted-foreground">{account.organization}</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Demo
                  </Badge>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  <div>Email: {account.email}</div>
                  <div>Password: {account.password}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;