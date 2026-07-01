import { Team, Player } from '../types';
import { DollarSign, ArrowUpRight, ArrowDownRight, Building2, Wallet } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface FinanceViewProps {
  team: Team;
  players: Player[];
}

export default function FinanceView({ team, players }: FinanceViewProps) {
  const totalWeeklyWage = players.reduce((sum, p) => sum + p.salary, 0);
  const projectedRevenue = team.fansBase * 0.5 + team.stadiumCapacity * 50;

  const data = [
    { month: 'Jan', revenue: 4000, expenses: 2400 },
    { month: 'Feb', revenue: 3000, expenses: 1398 },
    { month: 'Mar', revenue: 2000, expenses: 9800 },
    { month: 'Apr', revenue: 2780, expenses: 3908 },
    { month: 'May', revenue: 1890, expenses: 4800 },
    { month: 'Jun', revenue: 2390, expenses: 3800 },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter italic bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
          Club Accounting
        </h2>
        <p className="text-slate-400 font-medium">Strategic fiscal management and resource allocation.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl glass-card relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Wallet size={64} className="text-emerald-400" />
          </div>
          <div className="flex items-center gap-3 text-slate-500 mb-4 relative z-10">
            <Wallet size={18} className="text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Net Reserves</span>
          </div>
          <div className="text-4xl font-black text-white relative z-10 tracking-tight italic">€{(team.budget / 1000000).toFixed(1)}M</div>
          <div className="flex items-center gap-1 text-emerald-400 text-xs mt-4 font-black uppercase tracking-widest relative z-10">
            <ArrowUpRight size={14} className="animate-bounce" />
            +12.5% Growth
          </div>
        </div>

        <div className="p-8 rounded-3xl glass-card relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <DollarSign size={64} className="text-red-400" />
          </div>
          <div className="flex items-center gap-3 text-slate-500 mb-4 relative z-10">
            <DollarSign size={18} className="text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Wage Ceiling</span>
          </div>
          <div className="text-4xl font-black text-white relative z-10 tracking-tight italic">€{(totalWeeklyWage / 1000).toFixed(0)}k</div>
          <div className="flex items-center gap-1 text-emerald-400/60 text-xs mt-4 font-black uppercase tracking-widest relative z-10">
            <ArrowDownRight size={14} />
            Optimization Active
          </div>
        </div>

        <div className="p-8 rounded-3xl glass-card relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Building2 size={64} className="text-emerald-400" />
          </div>
          <div className="flex items-center gap-3 text-slate-500 mb-4 relative z-10">
            <Building2 size={18} className="text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Infra Budget</span>
          </div>
          <div className="text-4xl font-black text-white relative z-10 tracking-tight italic">€{(team.facilitiesLevel * 50).toFixed(0)}k</div>
          <div className="text-[10px] text-slate-500 mt-4 font-black uppercase tracking-widest relative z-10">Maintenance Level {team.facilitiesLevel}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 p-8 rounded-3xl glass-card">
          <h3 className="text-xl font-black text-white mb-8 italic uppercase tracking-tight">Revenue Trajectory</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#475569" 
                  fontSize={10} 
                  fontWeight={900}
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="#475569" 
                  fontSize={10} 
                  fontWeight={900}
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '20px', backdropFilter: 'blur(10px)' }}
                  itemStyle={{ color: '#10b981', fontWeight: 900, textTransform: 'uppercase', fontSize: '10px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="p-8 rounded-3xl glass-card">
          <h3 className="text-xl font-black text-white mb-8 italic uppercase tracking-tight">Financial Tiering</h3>
          <div className="space-y-4">
            {players.sort((a, b) => b.salary - a.salary).slice(0, 6).map((player) => (
              <div key={player.id} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 group hover:bg-emerald-500/10 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center font-black text-emerald-400 text-xs border border-emerald-500/20">
                    {player.rating}
                  </div>
                  <div>
                    <div className="text-sm font-black text-white uppercase tracking-tight">{player.name}</div>
                    <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{player.position}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-emerald-400 tracking-tighter">€{(player.salary / 1000).toFixed(0)}k/w</div>
                  <div className="text-[9px] text-slate-600 font-bold uppercase tracking-tighter">{(player.salary / totalWeeklyWage * 100).toFixed(1)}% Usage</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
