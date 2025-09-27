import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import heroImage from '@/assets/blue-carbon-hero.jpg';
import { 
  Waves, 
  Leaf, 
  Shield, 
  TrendingUp,
  Satellite,
  Database,
  Link as LinkIcon,
  Users,
  CheckCircle,
  ArrowRight,
  Globe,
  BarChart3
} from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-ocean to-forest">
              <Waves className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-lg text-ocean">Blue</span>
              <span className="font-bold text-lg text-forest">Carbon</span>
              <span className="text-sm text-muted-foreground ml-1">MRV</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
            <a href="#benefits" className="text-muted-foreground hover:text-foreground transition-colors">Benefits</a>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button className="bg-ocean hover:bg-ocean-dark" asChild>
              <Link to="/">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean/10 to-forest/10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-ocean">Blockchain-Powered</span><br />
              <span className="text-forest">Blue Carbon MRV</span><br />
              <span className="text-foreground">& Carbon Credits</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Revolutionary platform combining satellite monitoring, AI analytics, and blockchain technology 
              to verify and trade blue carbon credits from coastal ecosystem restoration projects.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-ocean hover:bg-ocean-dark" asChild>
                <Link to="/">
                  Start Monitoring
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-ocean">15,000+</div>
                <div className="text-sm text-muted-foreground">Hectares Monitored</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-forest">50K+</div>
                <div className="text-sm text-muted-foreground">Carbon Credits Issued</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ocean">98.5%</div>
                <div className="text-sm text-muted-foreground">Verification Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-forest">$2.4M</div>
                <div className="text-sm text-muted-foreground">Trading Volume</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Complete Blue Carbon Solution</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              End-to-end platform for monitoring, verifying, and trading blue carbon credits with transparency and precision
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-ocean/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Satellite className="w-12 h-12 text-ocean mb-4" />
                <CardTitle>Satellite Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Real-time monitoring using Landsat, Sentinel, and MODIS data with AI-powered NDVI and biomass analysis.
                </p>
              </CardContent>
            </Card>

            <Card className="border-forest/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Database className="w-12 h-12 text-forest mb-4" />
                <CardTitle>Field Data Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Seamless integration of field measurements, drone imagery, and IoT sensors for comprehensive data collection.
                </p>
              </CardContent>
            </Card>

            <Card className="border-ocean/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <LinkIcon className="w-12 h-12 text-ocean mb-4" />
                <CardTitle>Blockchain Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Immutable verification and tokenization of carbon credits using Ethereum smart contracts and IPFS storage.
                </p>
              </CardContent>
            </Card>

            <Card className="border-forest/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="w-12 h-12 text-forest mb-4" />
                <CardTitle>AI Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced machine learning algorithms for carbon sequestration prediction and ecosystem health assessment.
                </p>
              </CardContent>
            </Card>

            <Card className="border-ocean/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-ocean mb-4" />
                <CardTitle>Trading Marketplace</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Transparent marketplace for trading verified blue carbon credits with real-time pricing and settlements.
                </p>
              </CardContent>
            </Card>

            <Card className="border-forest/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-12 h-12 text-forest mb-4" />
                <CardTitle>Compliance Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Built-in compliance with VCS, Gold Standard, and other international carbon credit standards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple 4-step process from ecosystem restoration to verified carbon credit trading
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Project Setup',
                description: 'Register your blue carbon restoration project and define monitoring parameters',
                icon: <Globe className="w-8 h-8" />
              },
              {
                step: '02',
                title: 'Data Collection',
                description: 'Automated satellite monitoring combined with field data collection and verification',
                icon: <Database className="w-8 h-8" />
              },
              {
                step: '03',
                title: 'AI Verification',
                description: 'Machine learning algorithms verify carbon sequestration and ecosystem health metrics',
                icon: <CheckCircle className="w-8 h-8" />
              },
              {
                step: '04',
                title: 'Credit Trading',
                description: 'Blockchain-verified carbon credits are minted and made available for trading',
                icon: <TrendingUp className="w-8 h-8" />
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ocean to-forest text-white flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="text-sm font-semibold text-ocean mb-2">STEP {item.step}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Why Choose Our Platform?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                The most comprehensive and transparent blue carbon MRV system available, 
                designed for NGOs, governments, and carbon market participants.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: <Satellite className="w-6 h-6 text-ocean" />,
                    title: 'Real-time Monitoring',
                    description: 'Continuous satellite and IoT sensor monitoring with automated data collection'
                  },
                  {
                    icon: <Shield className="w-6 h-6 text-forest" />,
                    title: 'Transparent Verification',
                    description: 'Blockchain-based immutable records with third-party verification protocols'
                  },
                  {
                    icon: <Users className="w-6 h-6 text-ocean" />,
                    title: 'Multi-stakeholder Access',
                    description: 'Role-based access for NGOs, communities, verifiers, and market participants'
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <StatCard
                title="Monitoring Accuracy"
                value="98.5%"
                subtitle="satellite data precision"
                icon={<Satellite />}
                variant="ocean"
              />
              <StatCard
                title="Processing Speed"
                value="< 2min"
                subtitle="verification time"
                icon={<CheckCircle />}
                variant="forest"
              />
              <StatCard
                title="Cost Reduction"
                value="60%"
                subtitle="vs traditional MRV"
                icon={<TrendingUp />}
                variant="carbon"
              />
              <StatCard
                title="Transparency"
                value="100%"
                subtitle="blockchain verified"
                icon={<Shield />}
                variant="ocean"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Transform Blue Carbon Monitoring?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the future of carbon credit verification with our cutting-edge platform. 
              Start monitoring your blue carbon projects today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-ocean hover:bg-ocean-dark" asChild>
                <Link to="/">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                Schedule Demo
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              No credit card required • 30-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-6 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-ocean to-forest">
                  <Waves className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-ocean">Blue</span>
                  <span className="font-bold text-forest">Carbon</span>
                  <span className="text-sm text-muted-foreground ml-1">MRV</span>
                </div>
              </div>
              <p className="text-muted-foreground">
                Revolutionizing blue carbon monitoring and verification through blockchain technology.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Dashboard</a></li>
                <li><a href="#" className="hover:text-foreground">Projects</a></li>
                <li><a href="#" className="hover:text-foreground">Monitoring</a></li>
                <li><a href="#" className="hover:text-foreground">Marketplace</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground">API Reference</a></li>
                <li><a href="#" className="hover:text-foreground">Tutorials</a></li>
                <li><a href="#" className="hover:text-foreground">Support</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">
              © 2024 BlueCarbon MRV. All rights reserved.
            </p>
            <div className="flex items-center gap-1 mt-4 md:mt-0">
              <Leaf className="w-4 h-4 text-forest" />
              <span className="text-muted-foreground">Carbon Positive Platform</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;