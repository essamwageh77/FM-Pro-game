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
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">Club History & Trends</h2>
        <p className="text-slate-400">Long-term analysis of player performance and league standings.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="text-blue-400" size={20} />
              League Performance
            </h3>
            <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Points Trend</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="season" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                />
                <Line type="monotone" dataKey="points" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart3 className="text-emerald-400" size={20} />
              Squad Composition
            </h3>
            <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Position Count</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={squadDepth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="pos" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Award className="text-yellow-400" size={20} />
          Player Records
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-slate-800/30">
            <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Most Apps</div>
            <div className="text-lg font-bold text-white">Leo Becker</div>
            <div className="text-xs text-blue-400">124 Matches</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/30">
            <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Top Goalscorer</div>
            <div className="text-lg font-bold text-white">Cristiano Kane</div>
            <div className="text-xs text-red-400">82 Goals</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/30">
            <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Best Rating</div>
            <div className="text-lg font-bold text-white">Kevin Modric</div>
            <div className="text-xs text-emerald-400">8.42 Avg</div>
          </div>
        </div>
      </section>
    </div>
  );
}
