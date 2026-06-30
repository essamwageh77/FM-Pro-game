import React from 'react';
import { Player } from '../types';
import { motion } from 'motion/react';

interface PlayerCardProps {
  player: Player;
  showPrice?: boolean;
}

export default function PlayerCard({ player, showPrice = true }: PlayerCardProps) {
  const getCardColor = () => {
    if (player.rating >= 90) return 'from-amber-400 via-yellow-500 to-amber-600';
    if (player.rating >= 85) return 'from-slate-300 via-slate-400 to-slate-500';
    if (player.rating >= 75) return 'from-orange-400 via-orange-500 to-orange-600';
    return 'from-slate-600 via-slate-700 to-slate-800';
  };

  const isGK = player.position === 'GK';
  const stats = isGK ? [
    { label: 'DIV', value: player.attributes.pace },
    { label: 'HAN', value: player.attributes.shooting },
    { label: 'KIC', value: player.attributes.passing },
    { label: 'REF', value: player.attributes.dribbling },
    { label: 'SPD', value: player.attributes.defending },
    { label: 'POS', value: player.attributes.physical },
  ] : [
    { label: 'PAC', value: player.attributes.pace },
    { label: 'SHO', value: player.attributes.shooting },
    { label: 'PAS', value: player.attributes.passing },
    { label: 'DRI', value: player.attributes.dribbling },
    { label: 'DEF', value: player.attributes.defending },
    { label: 'PHY', value: player.attributes.physical },
  ];

  return (
    <div className="relative w-full aspect-[2/3] rounded-xl md:rounded-[2rem] overflow-hidden p-[1px] group shadow-2xl shadow-black/60">
      {/* Dynamic Glow / Border Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getCardColor()} opacity-40 transition-opacity duration-500`} />
      
      {/* Glass Inner Content */}
      <div className="absolute inset-[1px] rounded-[calc(0.75rem-1px)] md:rounded-[calc(2rem-1px)] bg-slate-950/80 backdrop-blur-3xl overflow-hidden flex flex-col border border-white/10">
        
        {/* Glossy Reflection Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

        {/* Inner Content Stack */}
        <div className="flex flex-col h-full relative z-10 p-2 md:p-4">
          
          {/* Top Section: Rating & Face */}
          <div className="relative flex flex-col items-center">
            {/* Rating Badge */}
            <div className="absolute top-0 left-0 flex flex-col items-start z-20">
              <div className="text-xl md:text-5xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] leading-none">
                {player.rating}
              </div>
              <div className="text-[7px] md:text-xs font-bold text-white/70 uppercase tracking-widest mt-0.5 drop-shadow-md">
                {player.position}
              </div>
            </div>

            {/* Player Face */}
            <div className="w-16 h-16 md:w-36 md:h-36 relative mt-1 md:mt-4">
              {player.faceUrl && (
                <motion.img
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={player.faceUrl}
                  alt=""
                  className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                />
              )}
            </div>
          </div>

          {/* Player Identity Section */}
          <div className="text-center mt-0.5 md:mt-4 mb-1 md:mb-3">
            <h3 className="text-[10px] md:text-2xl font-black text-white uppercase tracking-tighter leading-none mb-0.5 drop-shadow-md truncate px-1">
              {player.name.split(' ').pop()}
            </h3>
            <div className="text-[6px] md:text-[10px] font-bold text-white/50 flex justify-center items-center gap-1 md:gap-2 uppercase tracking-tight">
              <span>{player.nationality}</span>
              <span className="w-0.5 h-0.5 md:w-1 md:h-1 bg-white/20 rounded-full" />
              <span>{player.age}Y</span>
            </div>
          </div>

          {/* Stats Horizontal Layout */}
          <div className="border-t border-white/10 pt-1 md:pt-4 px-0.5 md:px-1">
            <div className="flex justify-between items-center">
              {stats.map((stat, idx) => (
                <React.Fragment key={stat.label}>
                  <StatItem label={stat.label} value={stat.value} />
                  {idx < stats.length - 1 && (
                    <div className="w-[1px] h-2 md:h-4 bg-white/10 mx-0.5" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Price at the very bottom */}
          {showPrice && (
            <div className="mt-auto pb-2 md:pb-4 text-center">
              <span className="text-blue-300/80 font-mono font-bold text-[7px] md:text-sm tracking-wider">
                €{(player.marketValue / 1000).toFixed(0)}K
              </span>
            </div>
          )}
        </div>

        {/* Futuristic Grid Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
          <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
        </div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none z-20" />
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[9px] md:text-lg font-black text-white leading-none">{value}</span>
      <span className="text-[5px] md:text-[9px] font-bold text-white/30 uppercase tracking-tighter mt-0.5">{label}</span>
    </div>
  );
}
