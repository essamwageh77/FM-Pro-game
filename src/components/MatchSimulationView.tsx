import { useState, useEffect, useRef } from 'react';
import { MatchState, Team, Player } from '../types';
import { MatchEngine } from '../lib/matchEngine';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, FastForward, ChevronRight, Trophy } from 'lucide-react';

interface MatchSimulationViewProps {
  match: MatchState;
  homeTeam: Team;
  awayTeam: Team;
  homePlayers: Player[];
  awayPlayers: Player[];
  onClose: () => void;
}

export default function MatchSimulationView({
  match: initialMatch,
  homeTeam,
  awayTeam,
  homePlayers,
  awayPlayers,
  onClose
}: MatchSimulationViewProps) {
  const [match, setMatch] = useState<MatchState>(initialMatch);
  const [isPaused, setIsPaused] = useState(false);
  const [simSpeed, setSimSpeed] = useState(1000); // ms per minute
  const engineRef = useRef<MatchEngine | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    engineRef.current = new MatchEngine(initialMatch, homeTeam, awayTeam, homePlayers, awayPlayers);
  }, []);

  useEffect(() => {
    if (isPaused || match.status === 'Finished') return;

    const interval = setInterval(() => {
      if (engineRef.current) {
        const nextState = engineRef.current.simulateMinute();
        setMatch({ ...nextState });
      }
    }, simSpeed);

    return () => clearInterval(interval);
  }, [isPaused, simSpeed, match.status]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [match.events]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col overflow-hidden">
      {/* Background Stadium */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/images/soccer_stadium_dark_glassy_1782856262108.jpg" 
          alt="Stadium Background" 
          className="w-full h-full object-cover opacity-20 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-slate-950/90" />
      </div>

      {/* Scoreboard */}
      <header className="p-6 md:p-10 relative z-10 shrink-0">
        <div className="max-w-5xl mx-auto glass-card rounded-[2.5rem] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-4 md:gap-12 text-center flex-1 w-full md:w-auto">
            <div className="flex-1 text-center md:text-right">
              <div className="text-2xl md:text-5xl font-black text-white italic uppercase tracking-tighter truncate leading-none mb-2">{homeTeam.name}</div>
              <div className="text-emerald-500/60 uppercase tracking-[0.3em] text-[10px] font-black">Home Advantage</div>
            </div>
            
            <div className="px-6 py-4 md:px-12 md:py-8 bg-white/5 rounded-3xl border border-white/10 shadow-inner flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors duration-500" />
              <div className="text-4xl md:text-8xl font-black text-white flex items-center gap-4 md:gap-8 relative z-10 leading-none">
                {match.homeScore} <span className="text-white/20 font-light italic text-2xl md:text-5xl">-</span> {match.awayScore}
              </div>
              <div className="text-emerald-400 font-mono text-sm md:text-2xl mt-4 flex items-center justify-center gap-2 relative z-10 font-black italic">
                <span className="bg-emerald-500/20 px-3 py-1 rounded-lg border border-emerald-500/30">
                  {match.minute}<span className="animate-pulse">'</span>
                </span>
                {match.status === 'Live' && <span className="text-xs uppercase tracking-widest text-emerald-500/50">Live</span>}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="text-2xl md:text-5xl font-black text-white italic uppercase tracking-tighter truncate leading-none mb-2">{awayTeam.name}</div>
              <div className="text-slate-500 uppercase tracking-[0.3em] text-[10px] font-black">Visiting Squad</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Simulation Area */}
      <main className="flex-1 overflow-hidden flex flex-col lg:grid lg:grid-cols-3 gap-6 md:gap-10 p-4 md:p-10 max-w-7xl mx-auto w-full relative z-10">
        {/* Commentary */}
        <section className="flex-1 lg:col-span-2 flex flex-col min-h-0 glass-card rounded-[2.5rem] overflow-hidden">
          <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between bg-white/5 backdrop-blur-3xl">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-sm md:text-xl font-black text-white italic uppercase tracking-tight leading-none">Live Match Report</h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-2 md:p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all border border-white/5"
              >
                {isPaused ? <Play size={22} fill="currentColor" /> : <Pause size={22} fill="currentColor" />}
              </button>
              <button
                onClick={() => setSimSpeed(prev => prev === 1000 ? 200 : 1000)}
                className={`p-2 md:p-3 rounded-xl transition-all border font-black text-xs px-4 ${simSpeed === 200 ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-900/40' : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'}`}
              >
                {simSpeed === 200 ? 'FAST' : 'NORMAL'}
              </button>
            </div>
          </div>
          <div ref={scrollRef} className="flex-1 p-6 md:p-10 space-y-4 md:space-y-6 overflow-y-auto scroll-smooth custom-scrollbar">
            <AnimatePresence initial={false}>
              {match.events.slice().reverse().map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  className={`p-5 md:p-8 rounded-[2rem] border transition-all duration-500 ${
                    event.type === 'Goal' ? 'bg-emerald-500/20 border-emerald-500/40 shadow-lg shadow-emerald-900/20' : 'bg-white/5 border-white/5'
                  }`}
                >
                  <div className="flex items-start gap-5 md:gap-8">
                    <div className={`font-mono font-black text-xl md:text-3xl italic ${event.type === 'Goal' ? 'text-white' : 'text-emerald-400'}`}>
                      {event.minute}<span className="text-sm opacity-50 font-sans tracking-widest leading-none">'</span>
                    </div>
                    <div className="flex-1">
                      <div className={`font-black text-xs md:text-sm tracking-widest mb-2 ${event.type === 'Goal' ? 'text-white' : 'text-emerald-500/80 uppercase'}`}>
                        {event.type.toUpperCase()}
                      </div>
                      <p className={`text-sm md:text-xl font-bold leading-relaxed ${event.type === 'Goal' ? 'text-white' : 'text-slate-300'}`}>
                        {event.description}
                      </p>
                    </div>
                    {event.type === 'Goal' && (
                      <div className="p-3 bg-white text-emerald-600 rounded-2xl shadow-xl animate-bounce">
                        <Trophy size={24} fill="currentColor" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Stats & Actions */}
        <section className="shrink-0 space-y-6 md:space-y-10 flex flex-col">
          <div className="p-8 md:p-10 rounded-[2.5rem] glass-card">
            <h3 className="text-lg md:text-xl font-black text-white mb-8 italic uppercase tracking-tighter">Performance Data</h3>
            <div className="space-y-8 md:space-y-12">
              <div>
                <div className="flex justify-between text-[10px] text-slate-500 uppercase font-black tracking-widest mb-4">
                  <span>Ball Control</span>
                  <span>Possession</span>
                </div>
                <div className="flex h-3 md:h-5 rounded-full overflow-hidden bg-white/5 p-1 border border-white/5 shadow-inner">
                  <div
                    className="bg-emerald-500 transition-all duration-1000 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                    style={{ width: `${match.stats.homePossession}%` }}
                  />
                  <div
                    className="bg-slate-700 transition-all duration-1000 rounded-full ml-1"
                    style={{ width: `${match.stats.awayPossession}%` }}
                  />
                </div>
                <div className="flex justify-between mt-3 text-lg md:text-2xl font-black text-white italic tracking-tighter">
                  <span>{Math.round(match.stats.homePossession)}%</span>
                  <span>{Math.round(match.stats.awayPossession)}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/5 text-center shadow-inner">
                  <div className="text-3xl md:text-5xl font-black text-white italic tracking-tighter leading-none mb-2">{match.stats.homeShots}</div>
                  <div className="text-[10px] text-emerald-400/60 uppercase tracking-widest font-black">Shots on Goal</div>
                </div>
                <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/5 text-center shadow-inner">
                  <div className="text-3xl md:text-5xl font-black text-white italic tracking-tighter leading-none mb-2">{match.stats.awayShots}</div>
                  <div className="text-[10px] text-slate-600 uppercase tracking-widest font-black">Counter Attacks</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end">
            {match.status === 'Finished' ? (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={onClose}
                className="w-full py-5 md:py-8 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[2rem] font-black text-lg md:text-2xl italic uppercase tracking-tighter shadow-2xl shadow-emerald-900/40 flex items-center justify-center gap-4 transition-all active:scale-95 group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                Return to Club
                <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </motion.button>
            ) : (
              <div className="p-6 md:p-8 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 text-center backdrop-blur-md">
                <div className="flex items-center justify-center gap-3 text-emerald-400 font-black italic uppercase tracking-widest text-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Match Engine Live
                </div>
                <p className="text-[10px] text-emerald-500/40 mt-2 uppercase tracking-[0.3em]">Processing Tactical Nodes</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
