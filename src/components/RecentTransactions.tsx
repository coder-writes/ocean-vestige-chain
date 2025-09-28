import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight,
  Calendar,
  CreditCard,
  TrendingUp,
  Building,
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { Transaction, formatIndianCurrency, formatIndianDate } from '@/data/transactionData';

interface RecentTransactionsProps {
  transactions: Transaction[];
  onViewTransaction: (transaction: Transaction) => void;
  maxTransactions?: number;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
  onViewTransaction,
  maxTransactions = 5
}) => {
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, maxTransactions);

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
        return <TrendingUp className="w-4 h-4 text-purple-600" />;
      default:
        return <CreditCard className="w-4 h-4 text-gray-600" />;
    }
  };

  if (recentTransactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <span>Recent Transactions</span>
          </CardTitle>
          <CardDescription>Latest carbon credit transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No transactions found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="w-5 h-5 text-blue-600" />
          <span>Recent Transactions</span>
        </CardTitle>
        <CardDescription>
          Latest carbon credit transactions • {recentTransactions.length} of {transactions.length} shown
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onViewTransaction(transaction)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getTransactionTypeIcon(transaction.transactionType)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 capitalize">
                      {transaction.transactionType} Transaction
                    </h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatIndianDate(transaction.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(transaction.status)}>
                    {getStatusIcon(transaction.status)}
                    <span className="ml-1 capitalize">{transaction.status}</span>
                  </Badge>
                </div>
              </div>

              {/* Transaction Flow */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex-1">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Building className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">From</span>
                    </div>
                    <p className="font-semibold text-sm text-gray-900">
                      {transaction.fromOrganization.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {transaction.fromOrganization.location.district}, {transaction.fromOrganization.location.state}
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <ArrowRight className="w-4 h-4 text-gray-600" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Building className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">To</span>
                    </div>
                    <p className="font-semibold text-sm text-gray-900">
                      {transaction.toOrganization.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {transaction.toOrganization.location.district}, {transaction.toOrganization.location.state}
                    </p>
                  </div>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-500">Credits</p>
                  <p className="font-semibold">{transaction.creditAmount.toLocaleString()} tCO₂</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Price/Credit</p>
                  <p className="font-semibold">{formatIndianCurrency(transaction.pricePerCredit)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Amount</p>
                  <p className="font-semibold text-green-600">{formatIndianCurrency(transaction.totalAmount)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Project</p>
                  <p className="font-semibold text-blue-600 truncate">{transaction.project.name}</p>
                </div>
              </div>

              {/* Purpose */}
              {transaction.purpose && (
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">Purpose</p>
                  <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded line-clamp-2">
                    {transaction.purpose}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="text-xs text-gray-500">
                  Transaction ID: <span className="font-mono">{transaction.id}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewTransaction(transaction);
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {transactions.length > maxTransactions && (
          <div className="mt-4 pt-4 border-t text-center">
            <Button variant="outline" className="w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              View All Transactions ({transactions.length})
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;