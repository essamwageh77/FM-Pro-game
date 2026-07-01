import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Player } from '../types';
import { PositionConfig, FORMATIONS } from '../lib/formations';
import DraggablePlayer from './DraggablePlayer';
import { motion, AnimatePresence } from 'motion/react';

interface TacticalPitchProps {
  formation: string;
  onFieldPlayers: Player[];
}

function PitchPosition({ position, player }: { position: PositionConfig; player?: Player; key?: string }) {
  const { setNodeRef, isOver } = useDroppable({
    id: position.id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      className={`absolute w-16 h-16 md:w-20 md:h-20 flex flex-col items-center justify-center rounded-full transition-all duration-300 ${
        isOver ? 'bg-emerald-500/30 scale-110 border-2 border-emerald-400' : 'bg-transparent'
      }`}
    >
      <AnimatePresence mode="wait">
        {player ? (
          <motion.div
            key={player.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <DraggablePlayer player={player} isCompact />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center gap-1"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/20 border-dashed bg-white/5 flex items-center justify-center">
              <span className="text-[8px] md:text-[10px] font-black text-white/40 uppercase tracking-tighter">
                {position.label}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TacticalPitch({ formation, onFieldPlayers }: TacticalPitchProps) {
  const formationConfig = FORMATIONS[formation] || FORMATIONS["4-3-3"];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-[200px] md:max-w-lg aspect-[3/4.2] md:aspect-[4/5] bg-slate-900 rounded-[1.2rem] md:rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
        {/* Pitch Background */}
        <div 
          className="absolute inset-0 opacity-40 bg-cover bg-center grayscale mix-blend-overlay"
          style={{ backgroundImage: 'url(/src/assets/images/soccer_stadium_dark_glassy_1782856262108.jpg)' }}
        />
        
        {/* Pitch Markings */}
        <div className="absolute inset-2 md:inset-4 border border-white/5 md:border-2 md:border-white/10 rounded-lg md:rounded-xl pointer-events-none">
          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 md:w-32 h-12 md:h-32 border border-white/5 md:border-2 md:border-white/10 rounded-full" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5 md:bg-white/10" />
          
          {/* Penalty Areas */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-10 md:h-24 border-b border-x border-white/5 md:border-b-2 md:border-x-2 md:border-white/10" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-10 md:h-24 border-t border-x border-white/5 md:border-t-2 md:border-x-2 md:border-white/10" />
          
          {/* Goals */}
          <div className="absolute top-[-2px] md:top-[-4px] left-1/2 -translate-x-1/2 w-10 md:w-20 h-1 md:h-2 bg-emerald-500/30 rounded-full blur-sm" />
          <div className="absolute bottom-[-2px] md:bottom-[-4px] left-1/2 -translate-x-1/2 w-10 md:w-20 h-1 md:h-2 bg-white/30 rounded-full blur-sm" />
        </div>

        {/* Positions */}
        <div className="absolute inset-0">
          {formationConfig.positions.map((pos) => {
            const player = onFieldPlayers.find(p => p.onFieldPosition === pos.id);
            return <PitchPosition key={pos.id} position={pos} player={player} />;
          })}
        </div>
      </div>

      {/* Drop Zone for Bench (Dragging player off pitch) */}
      <div className="mt-3 w-full max-w-[280px] md:max-w-lg px-2">
        <BenchDropZone />
      </div>
    </div>
  );
}

function BenchDropZone() {
  const { setNodeRef, isOver } = useDroppable({
    id: 'bench',
  });

  return (
    <div
      ref={setNodeRef}
      className={`px-8 py-4 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center gap-2 ${
        isOver 
          ? 'bg-red-500/20 border-red-500 text-red-400 scale-105 shadow-lg shadow-red-500/20' 
          : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'
      }`}
    >
      <div className="text-[10px] font-black uppercase tracking-[0.2em]">Bench Area</div>
      <div className="text-[9px] font-bold opacity-60">Drop player here to remove from pitch</div>
    </div>
  );
}
