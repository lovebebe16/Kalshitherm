import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, Calendar, Bookmark, BarChart3, Grid3x3, Sprout, Github } from 'lucide-react';

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
    <aside className="w-64 h-full bg-white/40 backdrop-blur-xl border-r border-white/30 p-4 flex flex-col shadow-lg">
      <div className="flex items-center gap-2 px-4 py-3 mb-4 bg-gradient-to-r from-botanical-fern/10 to-botanical-moss/10 rounded-xl flex-shrink-0">
        <Sprout className="w-5 h-5 text-botanical-fern" />
        <span className="text-sm font-semibold text-botanical-forest">Navigation</span>
      </div>
      <nav className="space-y-1.5 flex-1 overflow-y-auto min-h-0">
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
      <div className="pt-4 border-t border-botanical-sage/30 flex-shrink-0">
        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-4">
          <a
            href="https://x.com/kalshither72459?s=21"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/50 hover:bg-botanical-fern hover:text-white text-botanical-bark transition-all duration-300 hover:shadow-botanical hover:scale-110"
            title="Follow us on X"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://github.com/lovebebe16/Kalshitherm.git"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/50 hover:bg-botanical-forest hover:text-white text-botanical-bark transition-all duration-300 hover:shadow-botanical hover:scale-110"
            title="View on GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
        {/* CA Address */}
        <div
          className="mb-4 px-3 py-2.5 bg-botanical-marigold/20 border border-botanical-marigold/40 rounded-xl cursor-pointer hover:bg-botanical-marigold/30 transition-all"
          onClick={() => {
            navigator.clipboard.writeText('5jFhzipJmf73bkZyiV6NG8VDD3XWXfAa2vxiBFwZpump');
            alert('CA copied to clipboard!');
          }}
          title="Click to copy CA"
        >
          <p className="text-xs text-botanical-forest font-semibold mb-1">CA:</p>
          <p className="text-xs text-botanical-bark font-mono truncate">5jFhzipJmf73bkZyiV6NG8VDD3XWXfAa2vxiBFwZpump</p>
        </div>
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
