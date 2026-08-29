import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="inline-flex p-4 rounded-2xl bg-cyber-amber/10 border border-cyber-amber/30 text-cyber-amber mb-2">
        <ShieldAlert className="w-12 h-12 animate-pulse" />
      </div>
      
      <h1 className="text-4xl sm:text-5xl font-extrabold font-mono text-slate-100">
        404 <span className="text-cyber-amber">&bull; Route Not Found</span>
      </h1>
      
      <p className="text-sm text-slate-400 font-sans max-w-md mx-auto leading-relaxed">
        The requested Swarm sector does not exist or has been re-indexed. Return to the primary command center.
      </p>

      <div className="pt-4">
        <Link
          to="/pitch"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyber-cyan text-obsidian-950 font-mono font-bold text-xs hover:bg-cyber-cyan/90 transition-all shadow-glow-cyan/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Pitch & Simulator</span>
        </Link>
      </div>
    </div>
  );
};
