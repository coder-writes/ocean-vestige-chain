import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  variant?: 'default' | 'ocean' | 'forest' | 'carbon';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = 'default',
  className,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'ocean':
        return 'border-ocean-light bg-gradient-to-br from-ocean-light/10 to-ocean/5';
      case 'forest':
        return 'border-forest-light bg-gradient-to-br from-forest-light/10 to-forest/5';
      case 'carbon':
        return 'border-carbon-light bg-gradient-to-br from-carbon-light/10 to-carbon/5';
      default:
        return '';
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'ocean':
        return 'text-ocean';
      case 'forest':
        return 'text-forest';
      case 'carbon':
        return 'text-carbon';
      default:
        return 'text-primary';
    }
  };

  return (
    <Card className={cn(getVariantStyles(), className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className={cn('h-4 w-4', getIconColor())}>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
        {trend && (
          <div className="flex items-center text-xs mt-1">
            <span className={cn(
              'font-medium',
              trend.value >= 0 ? 'text-green-600' : 'text-red-600'
            )}>
              {trend.value >= 0 ? '+' : ''}{trend.value}%
            </span>
            <span className="text-muted-foreground ml-1">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};