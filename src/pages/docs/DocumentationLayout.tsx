import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  Home,
  Rocket,
  Settings,
  HelpCircle,
  FileText,
  Workflow,
  Users,
  Code,
  AlertCircle,
  Wallet,
  ThermometerSun,
  ScanSearch,
  Link2,
  BookOpen,
  ArrowLeft,
  Menu,
  X
} from 'lucide-react';

interface NavSection {
  title: string;
  icon: React.ReactNode;
  items: {
    title: string;
    path: string;
    icon?: React.ReactNode;
  }[];
}

const navSections: NavSection[] = [
  {
    title: 'Getting Started',
    icon: <Rocket className="w-4 h-4" />,
    items: [
      { title: 'Quick Start', path: '/docs/getting-started/quick-start', icon: <Rocket className="w-4 h-4" /> },
      { title: 'Installation', path: '/docs/getting-started/installation', icon: <Settings className="w-4 h-4" /> },
      { title: 'First Usage', path: '/docs/getting-started/first-usage', icon: <BookOpen className="w-4 h-4" /> },
    ],
  },
  {
    title: 'How It Works',
    icon: <Workflow className="w-4 h-4" />,
    items: [
      { title: 'System Overview', path: '/docs/how-it-works/overview', icon: <FileText className="w-4 h-4" /> },
      { title: 'Wallet Connection', path: '/docs/how-it-works/wallet-connection', icon: <Wallet className="w-4 h-4" /> },
      { title: 'Prediction Flow', path: '/docs/how-it-works/prediction-flow', icon: <ThermometerSun className="w-4 h-4" /> },
      { title: 'Market Scanning', path: '/docs/how-it-works/market-scanning', icon: <ScanSearch className="w-4 h-4" /> },
      { title: 'Polymarket Integration', path: '/docs/how-it-works/polymarket-integration', icon: <Link2 className="w-4 h-4" /> },
    ],
  },
  {
    title: 'User Guide',
    icon: <Users className="w-4 h-4" />,
    items: [
      { title: 'Dashboard', path: '/docs/user-guide/dashboard', icon: <Home className="w-4 h-4" /> },
      { title: 'Watchlist', path: '/docs/user-guide/watchlist', icon: <BookOpen className="w-4 h-4" /> },
      { title: 'Notifications', path: '/docs/user-guide/notifications', icon: <AlertCircle className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Technical Guide',
    icon: <Code className="w-4 h-4" />,
    items: [
      { title: 'Architecture', path: '/docs/technical/architecture', icon: <Workflow className="w-4 h-4" /> },
      { title: 'Solana Integration', path: '/docs/technical/solana-integration', icon: <Code className="w-4 h-4" /> },
      { title: 'API Reference', path: '/docs/technical/api-reference', icon: <FileText className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Troubleshooting',
    icon: <AlertCircle className="w-4 h-4" />,
    items: [
      { title: 'Common Issues', path: '/docs/troubleshooting/common-issues', icon: <AlertCircle className="w-4 h-4" /> },
      { title: 'Wallet Issues', path: '/docs/troubleshooting/wallet-issues', icon: <Wallet className="w-4 h-4" /> },
      { title: 'API Issues', path: '/docs/troubleshooting/api-issues', icon: <Code className="w-4 h-4" /> },
    ],
  },
  {
    title: 'FAQ',
    icon: <HelpCircle className="w-4 h-4" />,
    items: [
      { title: 'General', path: '/docs/faq/general', icon: <HelpCircle className="w-4 h-4" /> },
      { title: 'Technical', path: '/docs/faq/technical', icon: <Code className="w-4 h-4" /> },
      { title: 'Wallet', path: '/docs/faq/wallet', icon: <Wallet className="w-4 h-4" /> },
    ],
  },
];

interface CollapsibleSectionProps {
  section: NavSection;
  isExpanded: boolean;
  onToggle: () => void;
  currentPath: string;
}

const CollapsibleSection = ({ section, isExpanded, onToggle, currentPath }: CollapsibleSectionProps) => {
  const isActive = section.items.some(item => currentPath === item.path);

  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className={`flex items-center justify-between w-full px-3 py-2 text-left rounded-xl transition-all ${isActive ? 'bg-botanical-fern/15 text-botanical-fern' : 'text-botanical-bark hover:bg-botanical-moss/10'
          }`}
      >
        <div className="flex items-center gap-2">
          <span className={isActive ? 'text-botanical-fern' : 'text-botanical-terracotta'}>{section.icon}</span>
          <span className="font-medium text-sm">{section.title}</span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>

      {isExpanded && (
        <div className="ml-4 mt-1 space-y-1 border-l border-botanical-sage/30 pl-3">
          {section.items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-xl transition-all ${currentPath === item.path
                  ? 'bg-botanical-fern text-botanical-cream shadow-botanical'
                  : 'text-botanical-moss hover:bg-botanical-moss/10 hover:text-botanical-bark'
                }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export const DocumentationLayout = () => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(['Getting Started', 'How It Works']);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const sidebarContent = (
    <>
      {/* Logo and Back Link */}
      <div className="p-4 border-b border-botanical-sage/20">
        <Link to="/" className="flex items-center gap-2 text-botanical-moss hover:text-botanical-fern transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to App</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-botanical-fern to-botanical-moss rounded-xl flex items-center justify-center shadow-botanical">
            <BookOpen className="w-5 h-5 text-botanical-cream" />
          </div>
          <div>
            <h1 className="text-botanical-bark font-display font-bold">Kalshitherm Docs</h1>
            <p className="text-xs text-botanical-moss">v1.0.0</p>
          </div>
        </div>
      </div>

      {/* Search Box */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search documentation..."
            className="w-full bg-white border border-botanical-sage/30 rounded-xl px-4 py-2.5 text-sm text-botanical-bark placeholder-botanical-moss/60 focus:outline-none focus:ring-2 focus:ring-botanical-fern/50 focus:border-botanical-fern transition-all"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-botanical-moss bg-botanical-cream px-1.5 py-0.5 rounded-md font-mono">
            /
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-botanical">
        <Link
          to="/docs"
          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all mb-4 ${location.pathname === '/docs'
              ? 'bg-botanical-fern text-botanical-cream shadow-botanical'
              : 'text-botanical-bark hover:bg-botanical-moss/10'
            }`}
        >
          <Home className="w-4 h-4" />
          <span className="font-medium text-sm">Documentation Home</span>
        </Link>

        {navSections.map((section) => (
          <CollapsibleSection
            key={section.title}
            section={section}
            isExpanded={expandedSections.includes(section.title)}
            onToggle={() => toggleSection(section.title)}
            currentPath={location.pathname}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-botanical-sage/20">
        <div className="text-xs text-botanical-moss">
          <p>Last updated: December 2025</p>
          <p className="mt-1">Built with React + TypeScript</p>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-botanical-cream bg-botanical-pattern flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-botanical-fern rounded-xl text-botanical-cream shadow-botanical"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-botanical-bark/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-72 bg-botanical-petal border-r border-botanical-sage/20 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {sidebarContent}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto scrollbar-botanical">
        <div className="max-w-4xl mx-auto px-6 py-12 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
