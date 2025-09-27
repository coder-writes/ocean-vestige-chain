import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { StatCard } from '@/components/ui/stat-card';
import { SimpleChart } from '@/components/ui/simple-chart';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Wallet,
  Filter,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Shield,
  Leaf
} from 'lucide-react';

const marketData = [
  { date: '2024-01-01', price: 18.50 },
  { date: '2024-01-08', price: 19.20 },
  { date: '2024-01-15', price: 20.10 },
  { date: '2024-01-22', price: 19.80 },
  { date: '2024-01-29', price: 21.40 },
];

const carbonCredits = [
  {
    id: 'BC001',
    project: 'Mangrove Restoration Site Alpha',
    location: 'Florida Keys, USA',
    credits: 1250,
    price: 21.40,
    vintage: 2024,
    standard: 'VCS',
    status: 'available',
    verification: 'verified',
    type: 'Blue Carbon - Mangrove'
  },
  {
    id: 'BC002',
    project: 'Seagrass Conservation Beta',
    location: 'Chesapeake Bay, USA',
    credits: 890,
    price: 20.80,
    vintage: 2024,
    standard: 'Gold Standard',
    status: 'available',
    verification: 'verified',
    type: 'Blue Carbon - Seagrass'
  },
  {
    id: 'BC003',
    project: 'Salt Marsh Protection Gamma',
    location: 'San Francisco Bay, USA',
    credits: 675,
    price: 22.10,
    vintage: 2024,
    standard: 'VCS',
    status: 'pending',
    verification: 'pending',
    type: 'Blue Carbon - Salt Marsh'
  },
];

const transactions = [
  { id: 1, type: 'buy', credits: 500, price: 21.40, project: 'BC001', buyer: 'EcoTech Corp', time: '2 hours ago' },
  { id: 2, type: 'sell', credits: 250, price: 20.80, project: 'BC002', seller: 'Green Solutions', time: '5 hours ago' },
  { id: 3, type: 'buy', credits: 1000, price: 21.20, project: 'BC001', buyer: 'Carbon Neutral Ltd', time: '1 day ago' },
];

const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'mangrove' | 'seagrass' | 'saltmarsh'>('all');

  const filteredCredits = carbonCredits.filter(credit => {
    const matchesSearch = credit.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         credit.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || 
                       (selectedType === 'mangrove' && credit.type.includes('Mangrove')) ||
                       (selectedType === 'seagrass' && credit.type.includes('Seagrass')) ||
                       (selectedType === 'saltmarsh' && credit.type.includes('Salt Marsh'));
    return matchesSearch && matchesType;
  });

  const totalValue = carbonCredits.reduce((sum, credit) => sum + (credit.credits * credit.price), 0);
  const avgPrice = carbonCredits.reduce((sum, credit) => sum + credit.price, 0) / carbonCredits.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Carbon Credit Marketplace</h1>
          <p className="text-muted-foreground">
            Trade verified blue carbon credits on the blockchain
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Wallet className="w-4 h-4 mr-2" />
            My Portfolio
          </Button>
          <Button className="bg-ocean hover:bg-ocean-dark">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Place Order
          </Button>
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Market Cap"
          value={`$${(totalValue / 1000).toFixed(1)}K`}
          subtitle="total value"
          icon={<DollarSign />}
          trend={{ value: 12.3, label: 'vs last week' }}
          variant="ocean"
        />
        <StatCard
          title="Average Price"
          value={`$${avgPrice.toFixed(2)}`}
          subtitle="per tCO₂e"
          icon={<TrendingUp />}
          trend={{ value: 5.7, label: 'vs last week' }}
          variant="forest"
        />
        <StatCard
          title="Available Credits"
          value={carbonCredits.filter(c => c.status === 'available').reduce((sum, c) => sum + c.credits, 0).toLocaleString()}
          subtitle="tCO₂e for sale"
          icon={<Leaf />}
          variant="carbon"
        />
        <StatCard
          title="24h Volume"
          value="$47.2K"
          subtitle="trading volume"
          icon={<ArrowUpRight />}
          trend={{ value: 23.1, label: 'vs yesterday' }}
          variant="forest"
        />
      </div>

      {/* Price Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-ocean" />
            Blue Carbon Credit Price Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SimpleChart
            data={marketData}
            xKey="date"
            yKey="price"
            type="line"
            color="hsl(var(--ocean-blue))"
            className="h-64"
          />
        </CardContent>
      </Card>

      {/* Marketplace Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Available Credits */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search carbon credits..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  {[
                    { key: 'all', label: 'All Types' },
                    { key: 'mangrove', label: 'Mangrove' },
                    { key: 'seagrass', label: 'Seagrass' },
                    { key: 'saltmarsh', label: 'Salt Marsh' },
                  ].map((type) => (
                    <Button
                      key={type.key}
                      variant={selectedType === type.key ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedType(type.key as any)}
                      className={selectedType === type.key ? 'bg-ocean hover:bg-ocean-dark' : ''}
                    >
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credits List */}
          <div className="space-y-4">
            {filteredCredits.map((credit) => (
              <Card key={credit.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{credit.project}</h3>
                        <Badge variant="outline">{credit.id}</Badge>
                        <Badge className={credit.verification === 'verified' ? 'bg-forest text-white' : 'bg-yellow-500 text-white'}>
                          {credit.verification === 'verified' ? 'Verified' : 'Pending'}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{credit.location}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Type</p>
                          <p className="font-medium">{credit.type}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Standard</p>
                          <p className="font-medium">{credit.standard}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Vintage</p>
                          <p className="font-medium">{credit.vintage}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Available</p>
                          <p className="font-medium text-forest">{credit.credits.toLocaleString()} tCO₂e</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-right ml-6">
                      <div className="text-2xl font-bold text-ocean mb-1">
                        ${credit.price.toFixed(2)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">per tCO₂e</p>
                      
                      <div className="space-y-2">
                        <Button 
                          size="sm" 
                          className="w-full bg-ocean hover:bg-ocean-dark"
                          disabled={credit.status !== 'available'}
                        >
                          {credit.status === 'available' ? 'Buy Credits' : 'Pending Verification'}
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Market Activity */}
        <div className="space-y-6">
          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      tx.type === 'buy' ? 'bg-forest text-white' : 'bg-ocean text-white'
                    }`}>
                      {tx.type === 'buy' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">
                        {tx.type === 'buy' ? 'Buy' : 'Sell'} {tx.credits} credits
                      </p>
                      <p className="text-muted-foreground">{tx.time}</p>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-semibold">${(tx.credits * tx.price).toLocaleString()}</p>
                    <p className="text-muted-foreground">${tx.price}/tCO₂e</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Market Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Market Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trading Fee</span>
                <span className="font-medium">2.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Settlement</span>
                <span className="font-medium">T+1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Min Order</span>
                <span className="font-medium">10 tCO₂e</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Blockchain</span>
                <span className="font-medium">Polygon</span>
              </div>
            </CardContent>
          </Card>

          {/* Verification Standards */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Verification Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-forest"></div>
                <span className="text-sm font-medium">VCS (Verified Carbon Standard)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-ocean"></div>
                <span className="text-sm font-medium">Gold Standard</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-sm font-medium">Plan Vivo</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;