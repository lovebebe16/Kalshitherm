import { Link, useLocation } from 'react-router-dom';
import { Scan, TrendingUp, Calendar, Bookmark, BarChart3, Grid3x3, Sprout } from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem = ({ to, icon, label, active }: NavItemProps) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      active
        ? 'bg-botanical-fern text-botanical-cream shadow-botanical'
        : 'text-botanical-bark/70 hover:bg-botanical-moss/15 hover:text-botanical-bark'
    }`}
  >
    <span className={active ? 'text-botanical-cream' : 'text-botanical-terracotta'}>{icon}</span>
    <span className="font-medium">{label}</span>
  </Link>
);

export const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { to: '/scanner', icon: <Scan className="w-5 h-5" />, label: 'Scanner' },
    { to: '/predictions', icon: <TrendingUp className="w-5 h-5" />, label: 'Predictions' },
    { to: '/calendar', icon: <Calendar className="w-5 h-5" />, label: 'Calendar' },
    { to: '/watchlist', icon: <Bookmark className="w-5 h-5" />, label: 'Watchlist' },
    { to: '/markets', icon: <BarChart3 className="w-5 h-5" />, label: 'Markets' },
    { to: '/categories', icon: <Grid3x3 className="w-5 h-5" />, label: 'Categories' },
  ];

  return (
    <aside className="w-64 bg-botanical-petal border-r border-botanical-sage/20 p-4 flex flex-col">
      <div className="flex items-center gap-2 px-4 py-3 mb-4">
        <Sprout className="w-5 h-5 text-botanical-fern" />
        <span className="text-sm font-medium text-botanical-moss">Navigation</span>
      </div>
      <nav className="space-y-1.5 flex-1">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.to}
          />
        ))}
      </nav>
      <div className="mt-auto pt-4 border-t border-botanical-sage/20">
        <div className="px-4 py-3 bg-botanical-fern/10 rounded-xl">
          <p className="text-xs text-botanical-moss font-medium mb-1">Market Status</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-botanical-fern rounded-full animate-pulse"></span>
            <span className="text-sm text-botanical-bark font-semibold">Live</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
