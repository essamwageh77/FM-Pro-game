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
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col">
      {/* Scoreboard */}
      <header className="p-4 md:p-8 bg-slate-900 border-b border-slate-800 shrink-0">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 md:gap-8 text-center flex-1 w-full md:w-auto">
            <div className="flex-1 text-center md:text-right">
              <div className="text-xl md:text-4xl font-black text-white truncate">{homeTeam.name}</div>
              <div className="text-slate-500 uppercase tracking-widest text-[10px] md:text-xs mt-1">Home</div>
            </div>
            
            <div className="px-4 py-2 md:px-8 md:py-4 bg-slate-800 rounded-2xl md:rounded-3xl border border-slate-700 shadow-2xl shrink-0">
              <div className="text-3xl md:text-6xl font-black text-white flex items-center gap-2 md:gap-4">
                {match.homeScore} <span className="text-slate-600">:</span> {match.awayScore}
              </div>
              <div className="text-emerald-400 font-mono text-sm md:text-xl mt-1 flex items-center justify-center gap-1 md:gap-2">
                {match.minute}'
                {match.status === 'Live' && <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>●</motion.span>}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="text-xl md:text-4xl font-black text-white truncate">{awayTeam.name}</div>
              <div className="text-slate-500 uppercase tracking-widest text-[10px] md:text-xs mt-1">Away</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Simulation Area */}
      <main className="flex-1 overflow-hidden flex flex-col lg:grid lg:grid-cols-3 gap-4 md:gap-8 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {/* Commentary */}
        <section className="flex-1 lg:col-span-2 flex flex-col min-h-0 bg-slate-900/50 rounded-2xl md:rounded-3xl border border-slate-800 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900">
            <h3 className="text-sm md:text-lg font-bold text-white">Live Match Feed</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-1.5 md:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              >
                {isPaused ? <Play size={18} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}
              </button>
              <button
                onClick={() => setSimSpeed(prev => prev === 1000 ? 200 : 1000)}
                className={`p-1.5 md:p-2 rounded-lg transition-colors ${simSpeed === 200 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                <FastForward size={18} />
              </button>
            </div>
          </div>
          <div ref={scrollRef} className="flex-1 p-4 md:p-6 space-y-3 md:space-y-4 overflow-y-auto scroll-smooth">
            <AnimatePresence initial={false}>
              {match.events.slice().reverse().map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-3 md:p-4 rounded-xl md:rounded-2xl border ${
                    event.type === 'Goal' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-800/30 border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="text-blue-400 font-mono font-bold w-6 md:w-8 text-sm md:text-base">{event.minute}'</span>
                    <div>
                      <div className={`font-bold text-[10px] md:text-sm ${event.type === 'Goal' ? 'text-emerald-400' : 'text-white'}`}>
                        {event.type.toUpperCase()}
                      </div>
                      <p className="text-slate-300 text-xs md:text-base mt-0.5 md:mt-1">{event.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Stats & Actions */}
        <section className="shrink-0 space-y-4 md:space-y-6 flex flex-col">
          <div className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-slate-900/50 border border-slate-800">
            <h3 className="text-sm md:text-lg font-bold text-white mb-4 md:mb-6">Statistics</h3>
            <div className="space-y-4 md:space-y-6">
              <div>
                <div className="flex justify-between text-[10px] text-slate-500 uppercase font-bold mb-1 md:mb-2">
                  <span>Possession</span>
                </div>
                <div className="flex h-2 md:h-3 rounded-full overflow-hidden bg-slate-800">
                  <div
                    className="bg-blue-500 transition-all duration-1000"
                    style={{ width: `${match.stats.homePossession}%` }}
                  />
                  <div
                    className="bg-red-500 transition-all duration-1000"
                    style={{ width: `${match.stats.awayPossession}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1 md:mt-2 text-xs md:text-sm font-bold text-white">
                  <span>{Math.round(match.stats.homePossession)}%</span>
                  <span>{Math.round(match.stats.awayPossession)}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-800/50 text-center">
                  <div className="text-xl md:text-2xl font-bold text-white">{match.stats.homeShots}</div>
                  <div className="text-[8px] md:text-[10px] text-slate-500 uppercase tracking-widest mt-1">Shots (H)</div>
                </div>
                <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-800/50 text-center">
                  <div className="text-xl md:text-2xl font-bold text-white">{match.stats.awayShots}</div>
                  <div className="text-[8px] md:text-[10px] text-slate-500 uppercase tracking-widest mt-1">Shots (A)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end">
            {match.status === 'Finished' ? (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={onClose}
                className="w-full py-3 md:py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl md:rounded-2xl font-bold text-base md:text-lg shadow-xl shadow-blue-900/40 flex items-center justify-center gap-3 transition-all active:scale-95"
              >
                Done
                <ChevronRight size={18} />
              </motion.button>
            ) : (
              <div className="p-3 md:p-6 rounded-xl md:rounded-3xl bg-blue-600/10 border border-blue-500/20 text-center">
                <p className="text-[10px] md:text-sm text-blue-400 italic">Match in progress...</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
