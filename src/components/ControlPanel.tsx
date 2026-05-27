import React from 'react';
import { Play, Square, RefreshCw, Shield, Gauge } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ControlPanelProps {
  isRunning: boolean;
  factCheckingEnabled: boolean;
  spreadSpeed: number;
  onToggleSimulation: () => void;
  onReset: () => void;
  onToggleFactChecking: () => void;
  onSpeedChange: (speed: number) => void;
  onInfectRandom: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isRunning,
  factCheckingEnabled,
  spreadSpeed,
  onToggleSimulation,
  onReset,
  onToggleFactChecking,
  onSpeedChange,
  onInfectRandom,
}) => {
  return (
    <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-2xl space-y-6">
      <h2 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'var(--font-satoshi), sans-serif' }}>
        Simulation Controls
      </h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onToggleSimulation}
            className={twMerge(
              clsx(
                "flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all",
                isRunning 
                  ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50" 
                  : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/50"
              )
            )}
          >
            {isRunning ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Pause' : 'Start'}
          </button>
          
          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 py-3 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg font-medium border border-slate-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
        </div>

        <button
          onClick={onInfectRandom}
          className="w-full flex items-center justify-center gap-2 py-3 bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 rounded-lg font-medium border border-orange-500/50 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Start Outbreak (Infect Random)
        </button>

        <div className="border-t border-slate-800 pt-4">
          <label className="flex items-center justify-between mb-3 cursor-pointer">
            <span className="flex items-center gap-2 text-sm text-slate-300">
              <Shield className={clsx("w-4 h-4", factCheckingEnabled ? "text-green-400" : "text-slate-500")} />
              Enable Fact Checking
            </span>
            <div className={clsx(
              "w-10 h-5 rounded-full relative transition-colors duration-300 ease-in-out",
              factCheckingEnabled ? "bg-green-500" : "bg-slate-700"
            )}>
              <div className={clsx(
                "w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform duration-300 ease-in-out",
                factCheckingEnabled ? "translate-x-5" : "translate-x-0.5"
              )} />
            </div>
            <input 
              type="checkbox" 
              className="hidden" 
              checked={factCheckingEnabled}
              onChange={onToggleFactChecking}
            />
          </label>
        </div>

        <div className="border-t border-slate-800 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-2 text-sm text-slate-300">
              <Gauge className="w-4 h-4" />
              Spread Speed
            </span>
            <span className="text-xs text-slate-400 font-mono">{spreadSpeed.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="2.0"
            step="0.1"
            value={spreadSpeed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
