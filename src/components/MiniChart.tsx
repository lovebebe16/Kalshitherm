// @ts-nocheck
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';

interface MiniChartProps {
  trend?: 'up' | 'down' | 'neutral';
  data?: number[];
}

export const MiniChart = ({ trend = 'neutral', data }: MiniChartProps) => {
  const chartData = useMemo(() => {
    if (data && data.length > 0) {
      return data.map((value, index) => ({ value, index }));
    }
    
    // Generate random data based on trend
    const points = 12;
    const baseValue = 50;
    let current = baseValue;
    
    return Array.from({ length: points }, (_, i) => {
      const direction = trend === 'up' ? 0.3 : trend === 'down' ? -0.3 : 0;
      const randomness = (Math.random() - 0.5) * 10;
      current = Math.max(10, Math.min(90, current + direction * 5 + randomness));
      return { value: current, index: i };
    });
  }, [trend, data]);

  const color = trend === 'up' ? '#4a7c59' : trend === 'down' ? '#b7472a' : '#6b9b7a';

  return (
    <div className="w-full h-12">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
