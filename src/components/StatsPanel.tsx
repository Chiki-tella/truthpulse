import React from 'react';
import { Users, AlertTriangle, Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsPanelProps {
  totalNodes: number;
  infectedNodes: number;
  spreadRate: number; // e.g. new infections per tick
}

const StatsPanel: React.FC<StatsPanelProps> = ({ totalNodes, infectedNodes, spreadRate }) => {
  const percentage = totalNodes > 0 ? ((infectedNodes / totalNodes) * 100).toFixed(1) : '0.0';

  return (
    <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-2xl space-y-6">
      <h2 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'var(--font-satoshi), sans-serif' }}>
        Network Statistics
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <Users className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Total Nodes</span>
          </div>
          <div className="text-2xl font-mono text-white">{totalNodes}</div>
        </div>

        <div className="bg-red-950/30 rounded-lg p-4 border border-red-900/50">
          <div className="flex items-center gap-2 text-red-400 mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Infected</span>
          </div>
          <motion.div 
            key={infectedNodes}
            initial={{ scale: 1.1, color: '#f87171' }}
            animate={{ scale: 1, color: '#fca5a5' }}
            className="text-2xl font-mono text-red-400"
          >
            {infectedNodes}
          </motion.div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
          <div className="flex items-center gap-2 text-blue-400 mb-1">
            <Activity className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Infection %</span>
          </div>
          <div className="text-2xl font-mono text-blue-400">{percentage}%</div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
          <div className="flex items-center gap-2 text-yellow-400 mb-1">
            <Zap className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Spread Rate</span>
          </div>
          <div className="text-2xl font-mono text-yellow-400">+{spreadRate.toFixed(1)}/s</div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
