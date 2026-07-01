import React from 'react';
import { Team, Player } from '../types';
import { motion } from 'motion/react';
import { Shield, Zap, Target, Sliders, Users } from 'lucide-react';
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import TacticalPitch from './TacticalPitch';
import DraggablePlayer from './DraggablePlayer';
import { FORMATIONS } from '../lib/formations';

interface SquadViewProps {
  team: Team;
  players: Player[];
  setPlayers: (players: Player[]) => void;
  setTeam: (team: Team) => void;
}

export default function SquadView({ team, players, setPlayers, setTeam }: SquadViewProps) {
  const formations = ["4-3-3", "4-4-2", "3-5-2", "5-3-2"];
  const mentalities: Array<'Defensive' | 'Balanced' | 'Attacking'> = ["Defensive", "Balanced", "Attacking"];

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const onFieldPlayers = players.filter(p => p.onFieldPosition);
  const benchedPlayers = players.filter(p => !p.onFieldPosition);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const playerId = active.id as string;
    const dropId = over.id as string;

    const updatedPlayers = players.map(p => {
      // If dropping onto a specific pitch position
      if (dropId !== 'bench') {
        // If this is the player being dragged, set their position
        if (p.id === playerId) {
          return { ...p, onFieldPosition: dropId };
        }
        // If another player was already in this position, bench them
        if (p.onFieldPosition === dropId) {
          return { ...p, onFieldPosition: null };
        }
      } else {
        // Dropping onto the bench
        if (p.id === playerId) {
          return { ...p, onFieldPosition: null };
        }
      }
      return p;
    });

    setPlayers(updatedPlayers);
  };

  // Re-validate positions when formation changes
  React.useEffect(() => {
    const formationConfig = FORMATIONS[team.tactics.formation];
    if (!formationConfig) return;

    const validPositionIds = formationConfig.positions.map(pos => pos.id);
    const hasInvalidPosition = players.some(p => p.onFieldPosition && !validPositionIds.includes(p.onFieldPosition));

    if (hasInvalidPosition) {
      const validatedPlayers = players.map(p => {
        if (p.onFieldPosition && !validPositionIds.includes(p.onFieldPosition)) {
          return { ...p, onFieldPosition: null };
        }
        return p;
      });
      setPlayers(validatedPlayers);
    }
  }, [team.tactics.formation]);

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="space-y-4 md:space-y-8 pb-20">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-2">
          <div>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-1 md:mb-2 uppercase tracking-tighter italic">Tactics & Squad</h2>
            <p className="text-xs md:text-sm text-slate-400 font-medium">Drag players onto the pitch to set your XI.</p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/10 self-start">
            <div className="p-2 bg-emerald-500 rounded-lg shadow-lg shadow-emerald-900/40">
              <Users size={20} className="text-white" />
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Squad Size</div>
              <div className="text-sm font-bold text-white leading-none">{players.length} Players</div>
            </div>
          </div>
        </header>

        <div className="flex flex-col xl:grid xl:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* TOP SECTION: Pitch and Bench Rail Side-by-Side on Mobile */}
          <div className="w-full flex flex-row xl:col-span-9 xl:contents gap-4">
            {/* LEFT/CENTER: Tactical Pitch */}
            <section className="flex-1 xl:col-span-5">
              <TacticalPitch formation={team.tactics.formation} onFieldPlayers={onFieldPlayers} />
            </section>

            {/* RIGHT: Squad List (Side rail on mobile) */}
            <section className="w-24 md:w-auto xl:col-span-4 flex flex-col gap-4">
              <div className="flex flex-col md:flex-row items-center justify-between px-2 gap-2">
                <h3 className="text-[10px] md:text-xl font-black text-white italic uppercase tracking-tighter whitespace-nowrap">Bench</h3>
                <div className="text-[8px] md:text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full uppercase tracking-widest">
                  {benchedPlayers.length}
                </div>
              </div>
              
              <div className="flex flex-col gap-2 max-h-[400px] md:max-h-[500px] xl:max-h-[800px] overflow-y-auto pr-1 custom-scrollbar">
                {benchedPlayers.sort((a, b) => b.rating - a.rating).map((player) => (
                  <DraggablePlayer key={player.id} player={player} />
                ))}
                {benchedPlayers.length === 0 && (
                  <div className="text-center py-8 bg-white/5 rounded-3xl border border-dashed border-white/10">
                    <p className="text-slate-500 text-[8px] font-bold italic">Empty</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* BOTTOM: Tactics Panel */}
          <section className="w-full xl:col-span-3 space-y-6">
            <div className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] glass-card border border-white/5">
              <h3 className="text-lg md:text-xl font-black text-white mb-6 md:mb-8 flex items-center gap-3 italic uppercase tracking-tight">
                <Sliders size={20} className="text-emerald-400" />
                Tactical Hub
              </h3>

              <div className="space-y-6 md:space-y-8">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">Formation</label>
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    {formations.map(f => (
                      <button
                        key={f}
                        onClick={() => setTeam({ ...team, tactics: { ...team.tactics, formation: f } })}
                        className={`py-2 md:py-3 px-3 md:px-4 rounded-xl text-[10px] md:text-xs font-bold transition-all duration-300 border ${
                          team.tactics.formation === f
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 border-emerald-500'
                            : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/10 hover:text-white'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">Philosophy</label>
                  <div className="space-y-2 md:space-y-3">
                    {mentalities.map(m => (
                      <button
                        key={m}
                        onClick={() => setTeam({ ...team, tactics: { ...team.tactics, mentality: m } })}
                        className={`w-full py-3 md:py-4 px-4 md:px-5 rounded-xl text-[10px] md:text-xs font-bold flex items-center justify-between transition-all duration-300 border ${
                          team.tactics.mentality === m
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                            : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {m}
                        <div className={`p-1 rounded-md md:p-1.5 md:rounded-lg ${team.tactics.mentality === m ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                          {m === 'Attacking' && <Zap size={12} className="md:w-[14px] md:h-[14px]" fill={team.tactics.mentality === m ? "currentColor" : "none"} />}
                          {m === 'Defensive' && <Shield size={12} className="md:w-[14px] md:h-[14px]" fill={team.tactics.mentality === m ? "currentColor" : "none"} />}
                          {m === 'Balanced' && <Target size={12} className="md:w-[14px] md:h-[14px]" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pressing</label>
                    <span className="text-emerald-400 font-mono font-bold text-sm">{team.tactics.pressingIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={team.tactics.pressingIntensity}
                    onChange={(e) => setTeam({ ...team, tactics: { ...team.tactics, pressingIntensity: parseInt(e.target.value) } })}
                    className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </DndContext>
  );
}

