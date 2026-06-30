import React from 'react';
import { Team, Player } from '../types';
import { motion } from 'motion/react';
import { TrendingUp, Users, DollarSign, Trophy, ShoppingCart } from 'lucide-react';
import PlayerCard from './PlayerCard';

interface DashboardViewProps {
  team: Team;
  squad: Player[];
  onNavigateToMarket: () => void;
}

export default function DashboardView({ team, squad, onNavigateToMarket }: DashboardViewProps) {
  const avgRating = squad.length > 0 ? Math.round(squad.reduce((sum, p) => sum + p.rating, 0) / squad.length) : 0;
  const totalValue = squad.reduce((sum, p) => sum + p.marketValue, 0);

  const stats = [
    { label: 'Team Strength', value: avgRating, icon: Trophy, color: 'text-yellow-400' },
    { label: 'Squad Size', value: squad.length, icon: Users, color: 'text-blue-400' },
    { label: 'Market Value', value: `€${(totalValue / 1000).toFixed(0)}k`, icon: TrendingUp, color: 'text-emerald-400' },
    { label: 'Available Budget', value: `€${(team.budget / 1000).toFixed(0)}k`, icon: DollarSign, color: 'text-blue-400' },
  ];

  if (squad.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-8">
        <div className="w-24 h-24 rounded-full bg-blue-600/10 flex items-center justify-center border border-blue-500/20 shadow-2xl shadow-blue-500/10">
          <ShoppingCart className="text-blue-400" size={48} />
        </div>
        <div className="space-y-4">
          <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter">Build Your Squad</h2>
          <p className="text-slate-400 max-w-md mx-auto font-medium">
            Your club is empty. You have <span className="text-emerald-400 font-bold">€1,000,000</span> to sign your first 11 players from the transfer market.
          </p>
        </div>
        <button
          onClick={onNavigateToMarket}
          className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-blue-900/40 transition-all active:scale-95 flex items-center gap-3"
        >
          Go to Transfer Market
          <TrendingUp size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Club Dashboard</h2>
          <p className="text-slate-400 font-medium">The state of {team.name} management.</p>
        </div>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 md:p-8 rounded-2xl md:rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl group hover:border-blue-500/30 transition-all"
          >
            <div className="flex items-center justify-between mb-3 md:mb-6">
              <div className={`p-2 md:p-3 rounded-lg md:rounded-2xl bg-slate-950/50 ${stat.color} border border-white/5`}>
                <stat.icon className="w-4 h-4 md:w-6 md:h-6" />
              </div>
              <span className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
            </div>
            <div className="text-xl md:text-3xl font-black text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
        <section className="space-y-8">
          <h3 className="text-sm md:text-xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
            <Trophy className="text-yellow-400" size={24} />
            Top Performance
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-8">
            {squad.sort((a, b) => b.rating - a.rating).slice(0, 5).map((player) => (
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
