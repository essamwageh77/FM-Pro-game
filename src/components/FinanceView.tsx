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
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">Club Finances</h2>
        <p className="text-slate-400">Monitor cash flow, wages, and stadium revenue.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center gap-3 text-slate-500 mb-2">
            <Wallet size={18} />
            <span className="text-xs font-bold uppercase">Current Balance</span>
          </div>
          <div className="text-3xl font-bold text-white">€{(team.budget / 1000000).toFixed(1)}M</div>
          <div className="flex items-center gap-1 text-emerald-400 text-xs mt-2 font-medium">
            <ArrowUpRight size={14} />
            +12.5% vs last month
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center gap-3 text-slate-500 mb-2">
            <DollarSign size={18} />
            <span className="text-xs font-bold uppercase">Weekly Wage Bill</span>
          </div>
          <div className="text-3xl font-bold text-white">€{(totalWeeklyWage / 1000).toFixed(0)}k</div>
          <div className="flex items-center gap-1 text-red-400 text-xs mt-2 font-medium">
            <ArrowDownRight size={14} />
            -2.1% after releases
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center gap-3 text-slate-500 mb-2">
            <Building2 size={18} />
            <span className="text-xs font-bold uppercase">Facility Costs</span>
          </div>
          <div className="text-3xl font-bold text-white">€{(team.facilitiesLevel * 50).toFixed(0)}k</div>
          <div className="text-xs text-slate-500 mt-2 font-medium">Level {team.facilitiesLevel} Maintenance</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-6">Financial Trends</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-6">Top Earners</h3>
          <div className="space-y-4">
            {players.sort((a, b) => b.salary - a.salary).slice(0, 6).map((player) => (
              <div key={player.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-bold text-white">{player.name}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest">{player.position}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">€{(player.salary / 1000).toFixed(0)}k/w</div>
                  <div className="text-[10px] text-slate-500">{(player.salary / totalWeeklyWage * 100).toFixed(1)}% of total</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
