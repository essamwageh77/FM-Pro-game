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
        
        <div className="px-6 py-4 rounded-2xl bg-blue-600/10 border border-blue-500/20 backdrop-blur-xl flex items-center gap-3 self-start">
          <Wallet className="text-blue-400" size={20} />
          <div>
            <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Club Budget</div>
            <div className="text-xl font-black text-white">€{(myTeam.budget / 1000).toFixed(0)}k</div>
          </div>
        </div>
      </header>

      {/* Filters Section */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input
            type="text"
            placeholder="Search by name, position or nationality..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-6 py-5 bg-slate-900/50 border border-slate-800 rounded-3xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all backdrop-blur-md"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-2 mr-2 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
            <Filter size={14} />
            Position:
          </div>
          <button
            onClick={() => setActivePosition('ALL')}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activePosition === 'ALL'
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-900/40'
                : 'bg-slate-900/50 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All
          </button>
          {positions.map(pos => (
            <button
              key={pos}
              onClick={() => setActivePosition(pos)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activePosition === pos
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-900/40'
                  : 'bg-slate-900/50 text-slate-400 hover:text-slate-200 border border-slate-800'
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
            className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3 font-bold"
          >
            <AlertCircle size={20} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-8">
        {filteredPlayers.map((player) => (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            key={player.id} 
            className="space-y-3 md:space-y-4"
          >
            <PlayerCard player={player} />
            <button
              onClick={() => handleBuyPlayer(player)}
              className="w-full py-2.5 md:py-3 bg-white text-slate-950 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-blue-400 hover:text-white transition-all active:scale-95 shadow-xl shadow-black/20"
            >
              Sign Player
            </button>
          </motion.div>
        ))}
      </div>
      
      {filteredPlayers.length === 0 && (
        <div className="py-20 text-center">
          <div className="text-slate-500 font-bold mb-2">No talent found matching your criteria.</div>
          <button onClick={() => { setSearchTerm(''); setActivePosition('ALL'); }} className="text-blue-400 font-bold text-sm hover:underline">Clear all filters</button>
        </div>
      )}
    </div>
  );
}
