import { Team, Player } from '../types';
import { History, TrendingUp, Award, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface HistoryViewProps {
  team: Team;
  players: Player[];
}

export default function HistoryView({ team, players }: HistoryViewProps) {
  const performanceData = [
    { season: '22/23', rank: 8, points: 52 },
    { season: '23/24', rank: 5, points: 68 },
    { season: '24/25', rank: 3, points: 75 },
    { season: '25/26', rank: 1, points: 89 },
  ];

  const squadDepth = [
    { pos: 'GK', count: 2 },
    { pos: 'DEF', count: 7 },
    { pos: 'MID', count: 8 },
    { pos: 'FWD', count: 5 },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter italic bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
          Legacy & Analytics
        </h2>
        <p className="text-slate-400 font-medium">Historical performance audit and developmental trends.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="p-8 rounded-3xl glass-card">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-white flex items-center gap-3 italic uppercase tracking-tight">
              <TrendingUp className="text-emerald-400" size={24} />
              Performance Curve
            </h3>
            <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Points Index</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="season" 
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
                <Line 
                  type="monotone" 
                  dataKey="points" 
                  stroke="#10b981" 
                  strokeWidth={4} 
                  dot={{ fill: '#10b981', r: 6, strokeWidth: 2, stroke: '#0f172a' }} 
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="p-8 rounded-3xl glass-card">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-white flex items-center gap-3 italic uppercase tracking-tight">
              <BarChart3 className="text-emerald-400" size={24} />
              Tactical Balance
            </h3>
            <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Depth Metrics</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={squadDepth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="pos" 
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
                />
                <Bar 
                  dataKey="count" 
                  fill="#10b981" 
                  radius={[10, 10, 0, 0]} 
                  opacity={0.8}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="p-8 rounded-3xl glass-card">
        <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3 italic uppercase tracking-tight">
          <Award className="text-yellow-500" size={24} />
          Hall of Records
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 group hover:bg-emerald-500/10 transition-all duration-300">
            <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2 group-hover:text-emerald-400 transition-colors">Most Appearances</div>
            <div className="text-xl font-black text-white italic tracking-tight">Leo Becker</div>
            <div className="text-xs text-emerald-500/80 font-black mt-1 uppercase tracking-widest">124 Matches</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 group hover:bg-emerald-500/10 transition-all duration-300">
            <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2 group-hover:text-emerald-400 transition-colors">Elite Goalscorer</div>
            <div className="text-xl font-black text-white italic tracking-tight">Cristiano Kane</div>
            <div className="text-xs text-red-500/80 font-black mt-1 uppercase tracking-widest">82 Goals</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 group hover:bg-emerald-500/10 transition-all duration-300">
            <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2 group-hover:text-emerald-400 transition-colors">Tactical Precision</div>
            <div className="text-xl font-black text-white italic tracking-tight">Kevin Modric</div>
            <div className="text-xs text-emerald-400 font-black mt-1 uppercase tracking-widest">8.42 Avg Rating</div>
          </div>
        </div>
      </section>
    </div>
  );
}
