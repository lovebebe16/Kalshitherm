import 'recharts';

declare module 'recharts' {
    // Fix JSX component type compatibility issues
    export const XAxis: React.FC<any>;
    export const YAxis: React.FC<any>;
    export const Tooltip: React.FC<any>;
    export const Line: React.FC<any>;
    export const Area: React.FC<any>;
    export const Bar: React.FC<any>;
    export const CartesianGrid: React.FC<any>;
    export const ResponsiveContainer: React.FC<any>;
    export const LineChart: React.FC<any>;
    export const AreaChart: React.FC<any>;
    export const ComposedChart: React.FC<any>;
    export const BarChart: React.FC<any>;
    export const Legend: React.FC<any>;
    export const Cell: React.FC<any>;
    export const PieChart: React.FC<any>;
    export const Pie: React.FC<any>;
    export const RadialBarChart: React.FC<any>;
    export const RadialBar: React.FC<any>;
}
