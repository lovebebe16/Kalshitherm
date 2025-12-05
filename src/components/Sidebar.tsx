import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, Calendar, Bookmark, BarChart3, Grid3x3, Sprout } from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem = ({ to, icon, label, active }: NavItemProps) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${active
      ? 'bg-gradient-to-r from-botanical-fern to-botanical-moss text-botanical-cream shadow-botanical'
      : 'text-botanical-bark hover:bg-white/50 hover:text-botanical-forest hover:shadow-sm'
      }`}
  >
    <span className={active ? 'text-botanical-cream' : 'text-botanical-fern'}>{icon}</span>
    <span className="font-medium">{label}</span>
  </Link>
);

export const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { to: '/predictions', icon: <TrendingUp className="w-5 h-5" />, label: 'Predictions' },
    { to: '/calendar', icon: <Calendar className="w-5 h-5" />, label: 'Calendar' },
    { to: '/watchlist', icon: <Bookmark className="w-5 h-5" />, label: 'Watchlist' },
    { to: '/markets', icon: <BarChart3 className="w-5 h-5" />, label: 'Markets' },
    { to: '/categories', icon: <Grid3x3 className="w-5 h-5" />, label: 'Categories' },
  ];

  return (
    <aside className="w-64 bg-white/40 backdrop-blur-xl border-r border-white/30 p-4 flex flex-col shadow-lg">
      <div className="flex items-center gap-2 px-4 py-3 mb-4 bg-gradient-to-r from-botanical-fern/10 to-botanical-moss/10 rounded-xl">
        <Sprout className="w-5 h-5 text-botanical-fern" />
        <span className="text-sm font-semibold text-botanical-forest">Navigation</span>
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
      <div className="mt-auto pt-4 border-t border-botanical-sage/30">
        <div className="px-4 py-3 bg-gradient-to-r from-botanical-fern/15 to-botanical-moss/10 rounded-xl border border-botanical-fern/20">
          <p className="text-xs text-botanical-forest font-medium mb-1">Market Status</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-botanical-fern rounded-full animate-pulse shadow-[0_0_8px_rgba(74,124,89,0.6)]"></span>
            <span className="text-sm text-botanical-bark font-semibold">Live</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
