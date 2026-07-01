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
    { label: 'Team Strength', value: avgRating, icon: Trophy, color: 'text-emerald-400' },
    { label: 'Squad Size', value: squad.length, icon: Users, color: 'text-emerald-300' },
    { label: 'Market Value', value: `€${(totalValue / 1000).toFixed(0)}k`, icon: TrendingUp, color: 'text-emerald-500' },
    { label: 'Available Budget', value: `€${(team.budget / 1000).toFixed(0)}k`, icon: DollarSign, color: 'text-emerald-400' },
  ];

  if (squad.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full -z-10" />
        <div className="w-32 h-32 rounded-full bg-emerald-600/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
          <ShoppingCart className="text-emerald-400" size={56} />
        </div>
        <div className="space-y-4">
          <h2 className="text-6xl font-black text-white italic uppercase tracking-tighter leading-tight">
            Build Your <span className="text-emerald-400">Legacy</span>
          </h2>
          <p className="text-slate-300 max-w-md mx-auto font-medium text-lg leading-relaxed">
            The dressing room is silent. You have <span className="text-emerald-400 font-bold">€1.0M</span> to assemble your championship-winning squad.
          </p>
        </div>
        <button
          onClick={onNavigateToMarket}
          className="px-12 py-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-emerald-900/40 transition-all active:scale-95 flex items-center gap-3 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          Enter Transfer Market
          <TrendingUp size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none mb-2">Club Dashboard</h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-slate-400 font-semibold tracking-wide uppercase text-xs">Managing {team.name} • Session Active</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 md:p-8 rounded-3xl glass-card group hover:border-emerald-500/40 transition-all duration-500 cursor-default"
          >
            <div className="flex items-center justify-between mb-4 md:mb-8">
              <div className={`p-3 md:p-4 rounded-2xl bg-white/5 ${stat.color} border border-white/5 shadow-inner`}>
                <stat.icon className="w-5 h-5 md:w-7 md:h-7" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{stat.label}</span>
            </div>
            <div className="text-2xl md:text-4xl font-black text-white tracking-tight">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl md:text-2xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
              <Trophy className="text-emerald-400" size={28} />
              Star Performers
            </h3>
            <div className="h-px flex-1 mx-8 bg-gradient-to-r from-emerald-500/30 to-transparent" />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-8">
            {squad.sort((a, b) => b.rating - a.rating).slice(0, 5).map((player) => (
              <div key={player.id} className="space-y-3">
                <PlayerCard 
                  player={player} 
                  showPrice={false} 
                />
                <div className="text-center">
                  <span className="text-slate-500 font-mono font-bold text-[10px] md:text-xs tracking-widest uppercase">
                    €{(player.marketValue / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
