import React from 'react';
import { Team, Player } from '../types';
import { motion } from 'motion/react';
import { Shield, Zap, Target, Sliders } from 'lucide-react';
import PlayerCard from './PlayerCard';

interface SquadViewProps {
  team: Team;
  players: Player[];
  setPlayers: (players: Player[]) => void;
  setTeam: (team: Team) => void;
}

export default function SquadView({ team, players, setPlayers, setTeam }: SquadViewProps) {
  const formations = ["4-3-3", "4-4-2", "3-5-2", "5-3-2"];
  const mentalities: Array<'Defensive' | 'Balanced' | 'Attacking'> = ["Defensive", "Balanced", "Attacking"];

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter italic">Squad Management</h2>
          <p className="text-slate-400 font-medium">Fine-tune your starting XI and define your tactical philosophy.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tactics Panel */}
        <section className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Sliders size={20} className="text-blue-400" />
              Tactical Instructions
            </h3>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Formation</label>
                <div className="grid grid-cols-2 gap-2">
                  {formations.map(f => (
                    <button
                      key={f}
                      onClick={() => setTeam({ ...team, tactics: { ...team.tactics, formation: f } })}
                      className={`py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                        team.tactics.formation === f
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Team Mentality</label>
                <div className="space-y-2">
                  {mentalities.map(m => (
                    <button
                      key={m}
                      onClick={() => setTeam({ ...team, tactics: { ...team.tactics, mentality: m } })}
                      className={`w-full py-3 px-4 rounded-xl text-sm font-medium flex items-center justify-between transition-all ${
                        team.tactics.mentality === m
                          ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800/50 text-slate-400 border border-transparent hover:bg-slate-800'
                      }`}
                    >
                      {m}
                      {m === 'Attacking' && <Zap size={16} />}
                      {m === 'Defensive' && <Shield size={16} />}
                      {m === 'Balanced' && <Target size={16} />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Pressing Intensity ({team.tactics.pressingIntensity}%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={team.tactics.pressingIntensity}
                  onChange={(e) => setTeam({ ...team, tactics: { ...team.tactics, pressingIntensity: parseInt(e.target.value) } })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Squad List */}
        <section className="lg:col-span-2 space-y-8">
          <h3 className="text-sm md:text-xl font-black text-white italic uppercase tracking-tighter">Your Current Squad</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2 md:gap-8">
            {players.sort((a, b) => b.rating - a.rating).map((player) => (
              <PlayerCard 
                key={player.id} 
                player={player} 
                showPrice={false} 
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
