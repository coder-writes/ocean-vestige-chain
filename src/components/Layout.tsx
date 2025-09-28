import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Map, 
  Database, 
  Shield, 
  TrendingUp, 
  Settings,
  Leaf,
  Waves,
  Menu,
  Bell,
  User,
  LogOut,
  Smartphone,
  Building,
  CheckSquare,
  Plane
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: Map },
  { name: 'Map', href: '/map', icon: Waves },
  { name: 'Monitoring', href: '/monitoring', icon: Database },
  { name: 'Verification', href: '/verification', icon: Shield },
  { name: 'Marketplace', href: '/marketplace', icon: TrendingUp },
  { name: 'Field Data', href: '/field-data', icon: Smartphone },
  { name: 'MRV System', href: '/mrv-verification', icon: CheckSquare },
  { name: 'NCCR Admin', href: '/nccr-admin', icon: Building },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex h-16 items-center px-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mr-8">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-ocean to-forest">
              <Waves className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-lg text-forest">EcoSangam</span>
              <span className="text-sm text-muted-foreground ml-1">India Blue Carbon</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1 flex-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.name} to={item.href}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    className={cn(
                      'gap-2',
                      isActive && 'bg-ocean text-white hover:bg-ocean-dark'
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-xs">
              {user?.role} - {user?.organization}
            </Badge>
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{user?.name}</span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
            <Button className="md:hidden" variant="ghost" size="sm">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur-sm mt-auto">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>© 2024 EcoSangam India</span>
              <span>•</span>
              <span>Protecting India's Blue Carbon Ecosystems</span>
            </div>
            <div className="flex items-center gap-1">
              <Leaf className="w-4 h-4 text-forest" />
              <span>Carbon Positive</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;