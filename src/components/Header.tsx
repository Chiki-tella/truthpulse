import React from 'react';
import { Activity } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full flex items-center justify-between p-6 border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <Activity className="text-red-500 w-8 h-8 animate-pulse" />
        <div>
          <h1 className="text-2xl font-bold tracking-wider text-white" style={{ fontFamily: 'var(--font-satoshi), sans-serif' }}>
            TruthPulse
          </h1>
          <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">
            Misinformation Propagation Simulator
          </p>
        </div>
      </div>
      <div className="text-right hidden md:block">
        <div className="text-sm text-slate-300">Live Network Monitoring System</div>
        <div className="text-xs text-slate-500 font-mono mt-1">SYSTEM_STATUS: ONLINE</div>
      </div>
    </header>
  );
};

export default Header;
