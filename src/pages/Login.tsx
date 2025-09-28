import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, Shield, Building, Users, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

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
      email: 'admin@ecosangam.in',
      password: 'admin123',
      role: 'System Admin',
      organization: 'EcoSangam India Platform',
      icon: <Shield className="w-4 h-4" />,
      color: 'bg-red-500'
    },
    {
      email: 'ngo@mangrovealliance.org',
      password: 'ngo123',
      role: 'NGO Manager',
      organization: 'India Mangrove Alliance',
      icon: <Leaf className="w-4 h-4" />,
      color: 'bg-forest'
    },
    {
      email: 'panchayat@sundarbans.gov.in',
      password: 'panchayat123',
      role: 'Panchayat Officer',
      organization: 'Sundarbans Panchayat',
      icon: <Users className="w-4 h-4" />,
      color: 'bg-ocean'
    },
    {
      email: 'gov@moef.gov.in',
      password: 'gov123',
      role: 'Government Official',
      organization: 'Ministry of Environment, Forest & Climate Change',
      icon: <Building className="w-4 h-4" />,
      color: 'bg-purple-500'
    },
    {
      email: 'verifier@qci.org.in',
      password: 'verifier123',
      role: 'Carbon Verifier',
      organization: 'Quality Council of India',
      icon: <CheckCircle className="w-4 h-4" />,
      color: 'bg-emerald-500'
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (login(email, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Please use demo accounts below.');
    }
  };

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setSelectedDemo(demoEmail);
    
    if (login(demoEmail, demoPassword)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean via-ocean-light to-forest">
      {/* Navigation Header */}
      <div className="w-full px-4 py-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-ocean-light transition-colors">
            <Leaf className="w-6 h-6" />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <Link to="/signup" className="text-white hover:text-ocean-light transition-colors">
            Need to register? <span className="underline">Sign up here</span>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center p-4 pt-8">
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
    </div>
  );
};

export default Login;