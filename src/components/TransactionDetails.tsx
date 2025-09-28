import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Building, 
  MapPin, 
  Calendar, 
  CreditCard,
  Hash,
  ArrowRight,
  ExternalLink,
  FileText,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Leaf,
  Users,
  Globe
} from 'lucide-react';
import { Transaction, formatIndianCurrency, formatIndianDate } from '@/data/transactionData';

interface TransactionDetailsProps {
  transaction: Transaction;
  onViewProject: (projectId: string) => void;
  onClose: () => void;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  transaction,
  onViewProject,
  onClose
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTransactionTypeIcon = (type: string) => {
    switch (type) {
      case 'purchase':
        return <CreditCard className="w-4 h-4 text-green-600" />;
      case 'transfer':
        return <ArrowRight className="w-4 h-4 text-blue-600" />;
      case 'retirement':
        return <Leaf className="w-4 h-4 text-purple-600" />;
      default:
        return <CreditCard className="w-4 h-4 text-gray-600" />;
    }
  };

  const getOrganizationTypeIcon = (type: string) => {
    switch (type) {
      case 'private':
        return <Building className="w-4 h-4 text-blue-600" />;
      case 'ngo':
        return <Leaf className="w-4 h-4 text-green-600" />;
      case 'panchayat':
        return <Users className="w-4 h-4 text-orange-600" />;
      case 'government':
        return <Building className="w-4 h-4 text-purple-600" />;
      case 'verifier':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      default:
        return <Globe className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                {getTransactionTypeIcon(transaction.transactionType)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Transaction Details</h2>
                <p className="text-gray-600">Carbon Credit {transaction.transactionType}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={getStatusColor(transaction.status)}>
                {getStatusIcon(transaction.status)}
                <span className="ml-1 capitalize">{transaction.status}</span>
              </Badge>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Transaction Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Transaction Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Hash className="w-5 h-5 text-blue-600" />
                    <span>Transaction Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Transaction ID</p>
                      <p className="font-mono text-sm bg-gray-100 p-2 rounded">{transaction.id}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Transaction Hash</p>
                      <p className="font-mono text-sm bg-gray-100 p-2 rounded break-all">
                        {transaction.transactionHash}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Timestamp</p>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{formatIndianDate(transaction.timestamp)}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Credits Transferred</p>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-lg">{transaction.creditAmount.toLocaleString()} tCO₂</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Organizations */}
              <Card>
                <CardHeader>
                  <CardTitle>Transaction Parties</CardTitle>
                  <CardDescription>Organizations involved in this carbon credit transaction</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* From Organization */}
                    <div className="p-4 border rounded-lg bg-red-50 border-red-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-red-800">From (Seller)</h4>
                        <Badge variant="outline" className="border-red-300 text-red-700">
                          {getOrganizationTypeIcon(transaction.fromOrganization.type)}
                          <span className="ml-1 capitalize">{transaction.fromOrganization.type}</span>
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-semibold text-lg">{transaction.fromOrganization.name}</h5>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{transaction.fromOrganization.location.district}, {transaction.fromOrganization.location.state}</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          <strong>Contact:</strong> {transaction.fromOrganization.contactPerson}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Reg. No:</strong> {transaction.fromOrganization.registrationNumber}
                        </p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center">
                      <div className="p-2 bg-gray-100 rounded-full">
                        <ArrowRight className="w-6 h-6 text-gray-600" />
                      </div>
                    </div>

                    {/* To Organization */}
                    <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-green-800">To (Buyer)</h4>
                        <Badge variant="outline" className="border-green-300 text-green-700">
                          {getOrganizationTypeIcon(transaction.toOrganization.type)}
                          <span className="ml-1 capitalize">{transaction.toOrganization.type}</span>
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-semibold text-lg">{transaction.toOrganization.name}</h5>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{transaction.toOrganization.location.district}, {transaction.toOrganization.location.state}</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          <strong>Contact:</strong> {transaction.toOrganization.contactPerson}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Reg. No:</strong> {transaction.toOrganization.registrationNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Purpose and Notes */}
              {(transaction.purpose || transaction.notes) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-gray-600" />
                      <span>Transaction Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {transaction.purpose && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-2">Purpose</p>
                        <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{transaction.purpose}</p>
                      </div>
                    )}
                    {transaction.notes && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-2">Additional Notes</p>
                        <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{transaction.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Financial Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Financial Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Credits</span>
                      <span className="font-semibold">{transaction.creditAmount.toLocaleString()} tCO₂</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per Credit</span>
                      <span className="font-semibold">{formatIndianCurrency(transaction.pricePerCredit)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount</span>
                      <span className="text-green-600">{formatIndianCurrency(transaction.totalAmount)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Associated Project */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Associated Project</CardTitle>
                  <CardDescription>Carbon credits source project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">{transaction.project.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{transaction.project.location.district}, {transaction.project.location.state}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="capitalize">
                        {transaction.project.type} Project
                      </Badge>
                      <Badge variant="outline" className={
                        transaction.project.status === 'active' ? 'bg-green-100 text-green-800' :
                        transaction.project.status === 'under_verification' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {transaction.project.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {transaction.project.description}
                    </p>
                    <div className="pt-2 space-y-2">
                      <Button
                        onClick={() => onViewProject(transaction.project.id)}
                        className="w-full"
                        variant="outline"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Full Project Details
                      </Button>
                      <Button
                        onClick={() => {
                          // Open project location in a new window with Google Maps
                          const { lat, lng } = transaction.project.location.coordinates;
                          const mapsUrl = `https://www.google.com/maps/@${lat},${lng},15z`;
                          window.open(mapsUrl, '_blank');
                        }}
                        className="w-full"
                        variant="ghost"
                        size="sm"
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        View Location on Google Maps
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Project Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Area</span>
                      <span className="font-semibold">{transaction.project.area.toLocaleString()} ha</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Sequestration</span>
                      <span className="font-semibold">{transaction.project.annualSequestration.toLocaleString()} tCO₂/yr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available Credits</span>
                      <span className="font-semibold text-green-600">{transaction.project.availableCredits.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Certification</span>
                      <span className="font-semibold text-xs">{transaction.project.certificationStandard}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;