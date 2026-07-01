import { Player, Team, PlayerPosition } from '../types';
import { useState } from 'react';
import { Search, Wallet, TrendingUp, AlertCircle, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PlayerCard from './PlayerCard';

interface ScoutingViewProps {
  players: Player[];
  myTeam: Team;
  setSquad: (players: Player[] | ((prev: Player[]) => Player[])) => void;
  setScoutingPlayers: (players: Player[] | ((prev: Player[]) => Player[])) => void;
  setTeam: (team: Team | ((prev: Team) => Team)) => void;
}

export default function ScoutingView({ players, myTeam, setSquad, setScoutingPlayers, setTeam }: ScoutingViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activePosition, setActivePosition] = useState<PlayerPosition | 'ALL'>('ALL');
  const [error, setError] = useState<string | null>(null);

  const positions = Object.values(PlayerPosition);

  const filteredPlayers = players.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = activePosition === 'ALL' || p.position === activePosition;
    return matchesSearch && matchesPosition;
  });

  const handleBuyPlayer = (player: Player) => {
    if (myTeam.budget < player.marketValue) {
      setError(`Insufficient funds! You need €${(player.marketValue / 1000).toFixed(0)}k`);
      setTimeout(() => setError(null), 3000);
      return;
    }

    // Update Budget
    setTeam(prev => ({
      ...prev,
      budget: prev.budget - player.marketValue
    }));

    // Add to Squad
    setSquad((prev: Player[]) => [...prev, { ...player, teamId: myTeam.id }]);
    
    // Remove from Market
    setScoutingPlayers((prev: Player[]) => prev.filter(p => p.id !== player.id));
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter italic bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
            Global Scouting
          </h2>
          <p className="text-slate-400 font-medium">Acquire world-class talent to redefine your tactical identity.</p>
        </div>
        
        <div className="px-6 py-4 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 backdrop-blur-xl flex items-center gap-3 self-start shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <Wallet className="text-emerald-400" size={24} />
          <div>
            <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Available Funds</div>
            <div className="text-2xl font-black text-white">€{(myTeam.budget / 1000).toFixed(0)}k</div>
          </div>
        </div>
      </header>

      {/* Filters Section */}
      <div className="space-y-6">
        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Scout by name, position or nationality..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-6 py-5 bg-white/5 border border-white/5 rounded-3xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all backdrop-blur-md placeholder:text-slate-600 shadow-inner"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-2 mr-3 text-slate-500 font-black text-[10px] uppercase tracking-widest">
            <Filter size={14} className="text-emerald-500/50" />
            Specialization:
          </div>
          <button
            onClick={() => setActivePosition('ALL')}
            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
              activePosition === 'ALL'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 border-emerald-500'
                : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/10 hover:text-white'
            }`}
          >
            All Talent
          </button>
          {positions.map(pos => (
            <button
              key={pos}
              onClick={() => setActivePosition(pos)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                activePosition === pos
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 border-emerald-500'
                  : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/10 hover:text-white'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3 font-bold shadow-lg"
          >
            <AlertCircle size={20} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-8">
        {filteredPlayers.map((player) => (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            key={player.id} 
            className="space-y-4"
          >
            <PlayerCard player={player} />
            <div className="text-center">
              <span className="text-emerald-400 font-mono font-bold text-xs md:text-sm tracking-widest bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
                €{(player.marketValue / 1000).toFixed(0)}K
              </span>
            </div>
            <button
              onClick={() => handleBuyPlayer(player)}
              className="w-full py-2.5 md:py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-emerald-900/20 border border-emerald-500/20 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              Sign Talent
            </button>
          </motion.div>
        ))}
      </div>
      
      {filteredPlayers.length === 0 && (
        <div className="py-24 text-center">
          <div className="text-slate-500 font-black text-lg uppercase tracking-tighter mb-4 italic">No prospects found in these regions.</div>
          <button onClick={() => { setSearchTerm(''); setActivePosition('ALL'); }} className="text-emerald-400 font-black text-sm hover:underline uppercase tracking-widest">Reset Scouting Filters</button>
        </div>
      )}
    </div>
  );
}
