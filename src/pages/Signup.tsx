import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Waves, 
  Building, 
  Users, 
  Leaf, 
  Shield, 
  CheckCircle, 
  Globe,
  ArrowLeft,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';

interface SignupFormData {
  organizationType: string;
  organizationName: string;
  registrationNumber: string;
  contactPersonName: string;
  contactPersonDesignation: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  state: string;
  district: string;
  pincode: string;
  websiteUrl: string;
  description: string;
  certifications: string;
  yearEstablished: string;
  agreesToTerms: boolean;
  agreesToDataPolicy: boolean;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    organizationType: '',
    organizationName: '',
    registrationNumber: '',
    contactPersonName: '',
    contactPersonDesignation: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    state: '',
    district: '',
    pincode: '',
    websiteUrl: '',
    description: '',
    certifications: '',
    yearEstablished: '',
    agreesToTerms: false,
    agreesToDataPolicy: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const organizationTypes = [
    {
      value: 'ngo',
      label: 'Non-Governmental Organization (NGO)',
      description: 'Environmental NGOs, Conservation Organizations',
      icon: <Leaf className="w-5 h-5 text-green-600" />,
      color: 'bg-green-50 border-green-200'
    },
    {
      value: 'panchayat',
      label: 'Panchayati Raj Institution',
      description: 'Village Panchayats, Block Panchayats, Zilla Panchayats',
      icon: <Users className="w-5 h-5 text-blue-600" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      value: 'government',
      label: 'Government Department',
      description: 'Forest Departments, Environmental Agencies',
      icon: <Building className="w-5 h-5 text-purple-600" />,
      color: 'bg-purple-50 border-purple-200'
    },
    {
      value: 'research',
      label: 'Research Institution',
      description: 'Universities, Research Organizations, ICFRE',
      icon: <Globe className="w-5 h-5 text-orange-600" />,
      color: 'bg-orange-50 border-orange-200'
    },
    {
      value: 'verifier',
      label: 'Carbon Verifier',
      description: 'Accredited Verification Bodies, Quality Council',
      icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
      color: 'bg-emerald-50 border-emerald-200'
    },
    {
      value: 'community',
      label: 'Community Organization',
      description: 'Fishermen Cooperatives, Local Communities',
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      color: 'bg-indigo-50 border-indigo-200'
    }
  ];

  const indianStates = [
    'Andhra Pradesh', 'Goa', 'Gujarat', 'Karnataka', 'Kerala', 
    'Maharashtra', 'Odisha', 'Tamil Nadu', 'West Bengal',
    'Puducherry', 'Andaman and Nicobar Islands', 'Lakshadweep'
  ];

  const handleInputChange = (field: keyof SignupFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.organizationType) newErrors.organizationType = 'Organization type is required';
    if (!formData.organizationName) newErrors.organizationName = 'Organization name is required';
    if (!formData.registrationNumber) newErrors.registrationNumber = 'Registration number is required';
    if (!formData.contactPersonName) newErrors.contactPersonName = 'Contact person name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.agreesToTerms) newErrors.agreesToTerms = 'You must agree to the terms and conditions';
    if (!formData.agreesToDataPolicy) newErrors.agreesToDataPolicy = 'You must agree to the data policy';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: API call to register organization
      console.log('Registration data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to login with success message
      navigate('/login', { 
        state: { 
          message: 'Registration submitted successfully! Please wait for approval before logging in.' 
        }
      });
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedOrgType = organizationTypes.find(type => type.value === formData.organizationType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <Waves className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">EcoSangam</h1>
                <p className="text-xs text-gray-500">India Blue Carbon Platform</p>
              </div>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Register Your Organization</h2>
            <p className="text-gray-600">
              Join India's national blue carbon monitoring platform and contribute to climate action
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Organization Registration</CardTitle>
              <CardDescription>
                Please provide accurate information about your organization. All registrations are subject to verification.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Organization Type Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Organization Type *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {organizationTypes.map((type) => (
                      <div
                        key={type.value}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.organizationType === type.value
                            ? type.color + ' border-current'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleInputChange('organizationType', type.value)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="pt-1">{type.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{type.label}</h4>
                            <p className="text-xs text-gray-600 mt-1">{type.description}</p>
                          </div>
                          {formData.organizationType === type.value && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.organizationType && (
                    <p className="text-red-500 text-sm flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.organizationType}
                    </p>
                  )}
                </div>

                {/* Organization Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="organizationName">Organization Name *</Label>
                    <Input
                      id="organizationName"
                      value={formData.organizationName}
                      onChange={(e) => handleInputChange('organizationName', e.target.value)}
                      placeholder="Enter your organization name"
                    />
                    {errors.organizationName && (
                      <p className="text-red-500 text-sm">{errors.organizationName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">Registration Number *</Label>
                    <Input
                      id="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                      placeholder="Government registration number"
                    />
                    {errors.registrationNumber && (
                      <p className="text-red-500 text-sm">{errors.registrationNumber}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPersonName">Contact Person Name *</Label>
                    <Input
                      id="contactPersonName"
                      value={formData.contactPersonName}
                      onChange={(e) => handleInputChange('contactPersonName', e.target.value)}
                      placeholder="Primary contact person"
                    />
                    {errors.contactPersonName && (
                      <p className="text-red-500 text-sm">{errors.contactPersonName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPersonDesignation">Designation</Label>
                    <Input
                      id="contactPersonDesignation"
                      value={formData.contactPersonDesignation}
                      onChange={(e) => handleInputChange('contactPersonDesignation', e.target.value)}
                      placeholder="Position/Title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="official@organization.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="10-digit mobile number"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Login Credentials */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="Minimum 8 characters"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm">{errors.password}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder="Re-enter password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Address Information</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Complete Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Full address of your organization"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Select
                        value={formData.state}
                        onValueChange={(value) => handleInputChange('state', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {indianStates.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.state && (
                        <p className="text-red-500 text-sm">{errors.state}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="district">District</Label>
                      <Input
                        id="district"
                        value={formData.district}
                        onChange={(e) => handleInputChange('district', e.target.value)}
                        placeholder="District name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pincode">PIN Code</Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        placeholder="6-digit PIN code"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Additional Information</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="websiteUrl">Website URL</Label>
                      <Input
                        id="websiteUrl"
                        value={formData.websiteUrl}
                        onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                        placeholder="https://your-organization.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yearEstablished">Year Established</Label>
                      <Input
                        id="yearEstablished"
                        value={formData.yearEstablished}
                        onChange={(e) => handleInputChange('yearEstablished', e.target.value)}
                        placeholder="YYYY"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Organization Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Brief description of your organization's mission and activities"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="certifications">Relevant Certifications/Accreditations</Label>
                    <Textarea
                      id="certifications"
                      value={formData.certifications}
                      onChange={(e) => handleInputChange('certifications', e.target.value)}
                      placeholder="List any relevant certifications, accreditations, or memberships"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreesToTerms"
                      checked={formData.agreesToTerms}
                      onCheckedChange={(checked) => handleInputChange('agreesToTerms', checked as boolean)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="agreesToTerms" className="text-sm">
                        I agree to the <Link to="/terms" className="text-blue-600 hover:underline">Terms and Conditions</Link> *
                      </Label>
                      {errors.agreesToTerms && (
                        <p className="text-red-500 text-sm">{errors.agreesToTerms}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreesToDataPolicy"
                      checked={formData.agreesToDataPolicy}
                      onCheckedChange={(checked) => handleInputChange('agreesToDataPolicy', checked as boolean)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="agreesToDataPolicy" className="text-sm">
                        I agree to the <Link to="/privacy" className="text-blue-600 hover:underline">Data Privacy Policy</Link> *
                      </Label>
                      {errors.agreesToDataPolicy && (
                        <p className="text-red-500 text-sm">{errors.agreesToDataPolicy}</p>
                      )}
                    </div>
                  </div>
                </div>

                {errors.submit && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {errors.submit}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                  </Button>
                  <Link to="/login" className="flex-1">
                    <Button variant="outline" size="lg" className="w-full">
                      Already have an account? Login
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;