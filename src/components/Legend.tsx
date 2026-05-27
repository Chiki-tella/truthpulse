import React from 'react';

const Legend: React.FC = () => {
  const items = [
    { label: 'Healthy User', color: 'bg-blue-500', glow: 'shadow-[0_0_10px_rgba(59,130,246,0.8)]' },
    { label: 'Infected Node', color: 'bg-red-500', glow: 'shadow-[0_0_15px_rgba(239,68,68,1)]' },
    { label: 'Fact-Checker', color: 'bg-green-500', glow: 'shadow-[0_0_10px_rgba(34,197,94,0.8)]' },
    { label: 'Skeptical User', color: 'bg-slate-400', glow: 'shadow-[0_0_5px_rgba(148,163,184,0.5)]' },
    { label: 'Influencer', color: 'border-2 border-white', text: 'Larger Node' },
  ];

  return (
    <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-2xl space-y-4">
      <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-2">
        Network Legend
      </h2>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div 
              className={`w-4 h-4 rounded-full ${item.color} ${item.glow || ''}`}
            />
            <span className="text-sm text-slate-300">
              {item.label}
              {item.text && <span className="text-xs text-slate-500 ml-2">({item.text})</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;
