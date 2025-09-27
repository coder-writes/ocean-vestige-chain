import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface SimpleChartProps {
  data: Array<Record<string, any>>;
  xKey: string;
  yKey: string;
  type?: 'line' | 'area';
  color?: string;
  className?: string;
}

export const SimpleChart: React.FC<SimpleChartProps> = ({
  data,
  xKey,
  yKey,
  type = 'line',
  color = 'hsl(var(--primary))',
  className = '',
}) => {
  const ChartComponent = type === 'area' ? AreaChart : LineChart;
  
  return (
    <div className={`w-full h-64 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey={xKey} 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fontSize: 12 }}
          />
          {type === 'area' ? (
            <Area
              type="monotone"
              dataKey={yKey}
              stroke={color}
              fill={color}
              fillOpacity={0.3}
              strokeWidth={2}
            />
          ) : (
            <Line
              type="monotone"
              dataKey={yKey}
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
            />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};