import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Player } from '../types';
import { CSS } from '@dnd-kit/utilities';

interface DraggablePlayerProps {
  player: Player;
  isCompact?: boolean;
  key?: string;
}

export default function DraggablePlayer({ player, isCompact }: DraggablePlayerProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: player.id,
    data: {
      player,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.5 : undefined,
  };

  if (isCompact) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="group relative flex flex-col items-center cursor-grab active:cursor-grabbing"
      >
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full border-2 border-white/20 overflow-hidden bg-slate-800 shadow-xl transition-transform group-hover:scale-110">
          <img
            src={player.faceUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}`}
            alt={player.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="mt-0.5 bg-black/60 backdrop-blur-md px-1.5 md:px-2 py-0.5 rounded text-[8px] md:text-[10px] font-bold text-white whitespace-nowrap shadow-lg">
          {player.name.split(' ').pop()}
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-emerald-500 rounded-full flex items-center justify-center text-[8px] md:text-[10px] font-black text-white border-2 border-slate-900 shadow-lg">
          {player.rating}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center gap-3 cursor-grab active:cursor-grabbing hover:bg-white/10 transition-colors group"
    >
      <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-800 border border-white/20">
        <img
          src={player.faceUrl}
          alt={player.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold text-white truncate">{player.name}</div>
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{player.position}</div>
      </div>
      <div className="text-sm font-black text-emerald-400 font-mono">{player.rating}</div>
    </div>
  );
}
