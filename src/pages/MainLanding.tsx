import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  Shield, 
  Building, 
  Users, 
  CheckCircle, 
  Globe, 
  TreePine, 
  Waves, 
  Target,
  TrendingUp,
  MapPin,
  Award,
  BookOpen,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';

const MainLanding: React.FC = () => {
  const features = [
    {
      icon: <Waves className="w-8 h-8 text-blue-600" />,
      title: "Blue Carbon Monitoring",
      description: "Advanced MRV system for mangroves, seagrass, and salt marshes across India's coastal regions"
    },
    {
      icon: <Target className="w-8 h-8 text-green-600" />,
      title: "Carbon Credit Verification",
      description: "Certified verification process aligned with international standards and India's NDC targets"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Multi-Stakeholder Platform",
      description: "Connecting Panchayats, NGOs, Government agencies, and verifiers in one ecosystem"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Real-time Analytics",
      description: "Live monitoring dashboards with satellite data integration and field measurements"
    }
  ];

  const statistics = [
    { value: "15.2M", label: "Hectares of Blue Carbon Ecosystems", unit: "ha" },
    { value: "127K", label: "Tons CO2 Sequestered Annually", unit: "tCO2/yr" },
    { value: "9", label: "Coastal States Participating", unit: "states" },
    { value: "450+", label: "Registered Organizations", unit: "orgs" }
  ];

  const ecosystemTypes = [
    {
      name: "Mangrove Forests",
      area: "4,628 km²",
      states: "Gujarat, West Bengal, Andhra Pradesh",
      icon: <TreePine className="w-6 h-6 text-green-700" />
    },
    {
      name: "Salt Marshes",
      area: "2,340 km²", 
      states: "Gujarat, Tamil Nadu, Kerala",
      icon: <Waves className="w-6 h-6 text-blue-700" />
    },
    {
      name: "Seagrass Beds",
      area: "1,890 km²",
      states: "Tamil Nadu, Andhra Pradesh, Odisha",
      icon: <Leaf className="w-6 h-6 text-emerald-700" />
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white p-2 rounded-lg">
                  <Waves className="w-8 h-8 text-blue-800" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">EcoSangam</h1>
                  <p className="text-blue-200 text-sm">India Blue Carbon MRV Platform</p>
                </div>
              </div>
              <Badge variant="outline" className="border-blue-300 text-blue-100 bg-blue-800/30">
                Government Initiative
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" className="border-blue-300 text-blue-100 hover:bg-blue-700">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-white text-blue-800 hover:bg-blue-50">
                  Register Organization
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              India's National Blue Carbon
              <span className="text-blue-600"> MRV Platform</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              A comprehensive Monitoring, Reporting, and Verification system for India's coastal blue carbon ecosystems. 
              Supporting national climate goals through scientific measurement and community participation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                  Join the Platform
                  <ExternalLink className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                <BookOpen className="mr-2 w-5 h-5" />
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Government Partnership */}
      <section className="py-8 bg-gray-50 border-t border-b">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600 mb-4">In partnership with</p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
              <span>Ministry of Environment, Forest & Climate Change</span>
              <span>•</span>
              <span>Indian Space Research Organisation (ISRO)</span>
              <span>•</span>
              <span>Quality Council of India</span>
              <span>•</span>
              <span>State Forest Departments</span>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Blue Carbon Impact Dashboard</h3>
            <p className="text-gray-600">Real-time data from India's coastal ecosystems</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <Card key={index} className="text-center border-l-4 border-l-blue-500">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Platform Features</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools for monitoring, verification, and management of blue carbon projects across India
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-gray-100 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Blue Carbon Ecosystems in India</h3>
            <p className="text-gray-600">Protected and monitored coastal habitats across Indian states</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ecosystemTypes.map((ecosystem, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {ecosystem.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{ecosystem.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {ecosystem.area}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {ecosystem.states}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Join India's Blue Carbon Initiative?</h3>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Register your organization and contribute to India's climate action through blue carbon conservation and monitoring.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3">
                Register as NGO
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                Register as Panchayat
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Waves className="w-6 h-6 text-blue-400" />
                <h4 className="text-lg font-bold">EcoSangam</h4>
              </div>
              <p className="text-gray-400 text-sm">
                India's official platform for blue carbon monitoring, reporting, and verification.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/about" className="hover:text-white">About Platform</Link></li>
                <li><Link to="/documentation" className="hover:text-white">Documentation</Link></li>
                <li><Link to="/guidelines" className="hover:text-white">Guidelines</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">For Organizations</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/signup" className="hover:text-white">Register NGO</Link></li>
                <li><Link to="/signup" className="hover:text-white">Register Panchayat</Link></li>
                <li><Link to="/signup" className="hover:text-white">Government Access</Link></li>
                <li><Link to="/verification" className="hover:text-white">Become Verifier</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  support@ecosangam.gov.in
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  1800-xxx-xxxx
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Government of India. Ministry of Environment, Forest & Climate Change. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLanding;