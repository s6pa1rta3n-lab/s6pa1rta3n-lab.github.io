import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  Flame, 
  FileText, 
  BookOpen, 
  Coins, 
  Share2, 
  Store, 
  Menu, 
  X, 
  Activity,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { NavItem } from '../../types';

export const NAV_ITEMS: NavItem[] = [
  {
    name: 'Pitch',
    path: '/pitch',
    description: 'Devpost Hackathon & Live Simulator',
    icon: 'Flame',
    badge: '40/30/30'
  },
  {
    name: 'Strategy & Ops',
    path: '/strategy',
    description: 'VC Deck, Tech Roadmap & B2B Hub',
    icon: 'FileText',
    badge: '5 Docs'
  },
  {
    name: 'Research Blog',
    path: '/blog',
    description: 'Autonomous Systems & MEV Harvesters',
    icon: 'BookOpen',
  },
  {
    name: 'Grants',
    path: '/grants',
    description: 'Stellar SCF, Octant & Cryptographic Proofs',
    icon: 'Coins',
    badge: 'Verified'
  },
  {
    name: 'Affiliates',
    path: '/affiliates',
    description: '4-Tier Revenue Share & Creator Toolkit',
    icon: 'Share2',
  },
  {
    name: 'Marketplace',
    path: '/marketplace',
    description: 'Autonomous Micro-Services & API Schemas',
    icon: 'Store',
  }
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll detection for glassmorphism header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/pitch' && (location.pathname === '/' || location.pathname === '/pitch')) {
      return true;
    }
    return location.pathname === path;
  };

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'FileText': return <FileText className="w-4 h-4" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4" />;
      case 'Coins': return <Coins className="w-4 h-4" />;
      case 'Share2': return <Share2 className="w-4 h-4" />;
      case 'Store': return <Store className="w-4 h-4" />;
      default: return <ShieldCheck className="w-4 h-4" />;
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-obsidian-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40' 
        : 'bg-obsidian-950/60 backdrop-blur-sm border-b border-slate-800/40'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand / Logo */}
          <Link 
            to="/pitch" 
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-cyber-cyan/50 rounded-lg p-1"
            aria-label="Universal Bounty Swarm Home"
          >
            <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-obsidian-900 to-obsidian-800 border border-cyber-cyan/40 flex items-center justify-center group-hover:border-cyber-cyan transition-all duration-300 shadow-glow-cyan/20">
              <div className="w-4 h-4 rounded-sm bg-cyber-cyan rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
              <div className="absolute w-2 h-2 rounded-full bg-cyber-volt"></div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-sm tracking-wider text-slate-100 group-hover:text-cyber-cyan transition-colors">
                  UNIVERSAL BOUNTY
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-cyber-volt/10 text-cyber-volt border border-cyber-volt/30 rounded font-semibold">
                  SWARM
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 tracking-tight">
                Autonomous Multi-Agent Fleet
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 flex items-center gap-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt ${
                    active
                      ? 'text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/30 shadow-glow-cyan/20'
                      : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  <span className={`transition-colors ${active ? 'text-cyber-cyan' : 'text-slate-400 group-hover:text-slate-200'}`}>
                    {getIcon(item.icon)}
                  </span>
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold tracking-tighter ${
                      active 
                        ? 'bg-cyber-cyan/20 text-cyber-cyan' 
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {active && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyber-cyan to-cyber-volt rounded-full shadow-glow-cyan"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Live Telemetry Pill */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-obsidian-900 border border-cyber-emerald/30 shadow-sm shadow-cyber-emerald/10 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-emerald opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-emerald"></span>
              </span>
              <span className="text-slate-300 text-[11px] font-medium flex items-center gap-1">
                <Activity className="w-3 h-3 text-cyber-emerald" />
                <span className="text-cyber-emerald font-semibold">Swarm Engine</span> Online
              </span>
            </div>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-slate-800/70 hover:bg-slate-700/80 border border-slate-700 text-slate-200 hover:text-white text-xs font-mono transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt"
              aria-label="GitHub Repository (opens in new tab)"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-obsidian-900 border border-cyber-emerald/30 text-[10px] font-mono text-cyber-emerald">
              <span className="inline-flex rounded-full h-1.5 w-1.5 bg-cyber-emerald"></span>
              <span>Online</span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 min-h-[44px] min-w-[44px] rounded-lg bg-obsidian-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-obsidian-950/98 border-b border-slate-800 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <div className="max-w-7xl mx-auto px-4 pt-3 pb-6 space-y-1.5">
            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Swarm Navigation Hub
            </div>
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3.5 min-h-[44px] rounded-xl text-sm font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt ${
                    active
                      ? 'bg-cyber-cyan/15 border border-cyber-cyan/40 text-cyber-cyan shadow-glow-cyan/10'
                      : 'bg-obsidian-900/60 border border-slate-800/80 text-slate-200 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-md ${active ? 'bg-cyber-cyan/20 text-cyber-cyan' : 'bg-slate-800 text-slate-400'}`}>
                      {getIcon(item.icon)}
                    </div>
                    <div>
                      <div className="font-semibold flex items-center gap-2">
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded uppercase font-bold bg-slate-800 text-slate-400 border border-slate-700">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-sans">{item.description}</div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${active ? 'text-cyber-cyan' : 'text-slate-600'}`} />
                </Link>
              );
            })}

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between px-2 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyber-emerald" />
                Fleet Status: <span className="text-cyber-emerald font-semibold">100% Operational</span>
              </span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-cyan flex items-center gap-1 hover:underline"
              >
                GitHub <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
