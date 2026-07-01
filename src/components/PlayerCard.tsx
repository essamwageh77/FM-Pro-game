import React, { useState } from 'react';
import { Player } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface PlayerCardProps {
  player: Player;
  showPrice?: boolean;
}

export default function PlayerCard({ player, showPrice = true }: PlayerCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

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

  const handleFlip = () => setIsFlipped(!isFlipped);

  return (
    <div 
      className="relative w-full aspect-[2/3] group cursor-pointer [perspective:1000px]"
      onClick={handleFlip}
    >
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d] transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-[2rem] overflow-hidden p-[1px] shadow-2xl shadow-black/60">
          <div className={`absolute inset-0 bg-gradient-to-br ${getCardColor()} opacity-40`} />
          <div className="absolute inset-[1px] rounded-[calc(2rem-1px)] bg-slate-950/80 backdrop-blur-3xl overflow-hidden flex flex-col border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
            
            <div className="flex flex-col h-full relative z-10 p-5">
              <div className="relative flex flex-col items-center flex-1 justify-center">
                <div className="absolute top-0 left-0 flex flex-col items-start z-20">
                  <div className="text-4xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] leading-none">
                    {player.rating}
                  </div>
                  <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest mt-1 drop-shadow-md">
                    {player.position}
                  </div>
                </div>

                <div className="w-32 h-32 relative mt-4">
                  {player.faceUrl && (
                    <motion.img
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      src={player.faceUrl}
                      alt=""
                      className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                    />
                  )}
                </div>
              </div>

              <div className="text-center mt-auto mb-4">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-1 drop-shadow-md truncate px-1">
                  {player.name.split(' ').pop()}
                </h3>
                <div className="text-[10px] font-bold text-white/50 flex justify-center items-center gap-2 uppercase tracking-tight">
                  <span>{player.nationality}</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                  <span>{player.age}Y</span>
                </div>
              </div>

              <div className="text-center">
                <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em]">Tap for Stats</span>
              </div>
            </div>

            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
              <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[2rem] overflow-hidden p-[1px] shadow-2xl shadow-black/60">
          <div className={`absolute inset-0 bg-gradient-to-br ${getCardColor()} opacity-40`} />
          <div className="absolute inset-[1px] rounded-[calc(2rem-1px)] bg-slate-900 overflow-hidden flex flex-col border border-white/10">
            <div className="flex flex-col h-full relative z-10 p-2.5 md:p-5 justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5 border-b border-white/10 pb-1">
                  <div className="text-lg font-black text-white">{player.rating}</div>
                  <div className="text-[8px] font-bold text-white/40 uppercase tracking-widest">{player.position}</div>
                  <div className="ml-auto text-[9px] font-bold text-white/60 truncate max-w-[70px]">{player.name.split(' ').pop()}</div>
                </div>

                <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 mt-1">
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center">
                      <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] mb-0">{stat.label}</span>
                      <span className="text-lg font-black text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.2)]">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center pt-1">
                <div className="text-[8px] font-bold text-white/50 mb-0 uppercase tracking-tight">
                  Value: <span className="text-blue-400">€{(player.marketValue / 1000).toFixed(0)}K</span>
                </div>
                <div className="text-[7px] font-bold text-white/20 uppercase tracking-[0.2em]">Tap to Return</div>
              </div>
            </div>

            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="h-full w-full" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

