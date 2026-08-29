import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ParticleCanvas } from '../common/ParticleCanvas';

interface ShellProps {
  children: React.ReactNode;
}

export const Shell: React.FC<ShellProps> = ({ children }) => {
  const { pathname } = useLocation();

  // Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-obsidian-950 text-slate-100 relative selection:bg-cyber-cyan/30 selection:text-cyber-cyan">
      {/* Background cyber grid & ambient particle swarm mesh */}
      <div className="fixed inset-0 bg-cyber-grid bg-[size:40px_40px] pointer-events-none opacity-25 z-0"></div>
      <ParticleCanvas className="fixed inset-0 pointer-events-none z-0 opacity-35" opacity={0.5} speed={0.35} />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="fixed bottom-1/3 right-1/4 w-96 h-96 bg-cyber-violet/5 rounded-full blur-3xl pointer-events-none z-0"></div>

      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow relative z-10">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
