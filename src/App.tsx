import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Users,
  Search,
  DollarSign,
  Trophy,
  Settings,
  Play,
  TrendingUp,
  GraduationCap,
  History,
  LogOut,
  ChevronLeft,
  Wallet,
  LayoutDashboard,
  Users,
  Search,
  DollarSign
} from 'lucide-react';
import { Player, Team, MatchState, User } from './types';
import { generateRealPlayers, generateInitialTeams } from './lib/mockData';
import DashboardView from './components/DashboardView';
import SquadView from './components/SquadView';
import ScoutingView from './components/ScoutingView';
import FinanceView from './components/FinanceView';
import MatchSimulationView from './components/MatchSimulationView';
import HistoryView from './components/HistoryView';
import LoginView from './components/LoginView';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hub');
  const [myTeam, setMyTeam] = useState<Team | null>(null);
  const [squad, setSquad] = useState<Player[]>([]);
  const [scoutingPlayers, setScoutingPlayers] = useState<Player[]>([]);
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [activeMatch, setActiveMatch] = useState<MatchState | null>(null);

  useEffect(() => {
    // Check local storage for persistent session
    const savedUser = localStorage.getItem('fm_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user");
      }
    }
    setAuthLoading(false);
  }, []);

  useEffect(() => {
    if (!user) return;
    const teams = generateInitialTeams();
    const players = generateRealPlayers();

    setAllTeams(teams);
    setMyTeam(teams[0]);
    // Start with empty squad to force "Build your squad"
    setSquad([]);
    setScoutingPlayers(players);
  }, [user]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('fm_user', JSON.stringify(userData));
    setActiveTab('scouting'); // Start with scouting/market to build squad
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('fm_user');
  };

  const handleStartMatch = () => {
    const onFieldPlayers = squad.filter(p => p.onFieldPosition);
    
    if (!myTeam || allTeams.length < 1 || onFieldPlayers.length < 11) {
      alert("You need to place 11 players on the pitch in your Squad & Tactics page to start a match!");
      return;
    }

    // Since we only have one team in this simplified version, let's generate a temporary rival
    const opponent: Team = {
      ...myTeam,
      id: 'rival-1',
      name: 'Rival XI',
    };

    const initialMatch: MatchState = {
      id: `m-${Date.now()}`,
      homeTeamId: myTeam.id,
      awayTeamId: opponent.id,
      homeScore: 0,
      awayScore: 0,
      minute: 0,
      status: 'Live',
      events: [{
        minute: 0,
        type: 'Commentary',
        description: `Welcome to the match between ${myTeam.name} and ${opponent.name}!`,
        teamId: myTeam.id
      }],
      stats: {
        homeShots: 0,
        awayShots: 0,
        homePossession: 50,
        awayPossession: 50
      }
    };
    setActiveMatch(initialMatch);
    setActiveTab('match');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Office', icon: LayoutDashboard, desc: 'Overview & News', color: 'from-blue-600 to-blue-400' },
    { id: 'squad', label: 'Tactics', icon: Users, desc: 'Lineup & Tactics', color: 'from-emerald-600 to-emerald-400' },
    { id: 'scouting', label: 'Market', icon: Search, desc: 'Sign Talent', color: 'from-purple-600 to-purple-400' },
    { id: 'finance', label: 'Finance', icon: DollarSign, desc: 'Club Budget', color: 'from-amber-600 to-amber-400' },
    { id: 'history', label: 'History', icon: History, desc: 'Past Results', color: 'from-slate-600 to-slate-400' },
  ];

  if (authLoading) return <div className="flex items-center justify-center h-screen bg-slate-950 text-white font-black italic uppercase tracking-tighter">Loading...</div>;
  if (!user) return <LoginView onLogin={handleLogin} />;
  if (!myTeam) return <div className="flex items-center justify-center h-screen bg-slate-950 text-white font-black italic uppercase tracking-tighter">Initializing Club...</div>;

  return (
    <div className="relative h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30 overflow-hidden flex flex-col">
      {/* Shared Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/images/soccer_stadium_dark_glassy_1782856262108.jpg" 
          alt="Stadium" 
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/60 to-slate-950" />
      </div>

      <main className="relative flex-1 z-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'hub' ? (
            <motion.div
              key="hub"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="h-full flex flex-col items-center justify-center p-4 md:p-6 space-y-6 md:space-y-12 max-w-5xl mx-auto overflow-hidden"
            >
              <div className="text-center space-y-1 md:space-y-2">
                <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent drop-shadow-2xl">
                  HUB
                </h1>
                <p className="text-[8px] md:text-xs font-black text-slate-500 uppercase tracking-[0.4em] italic">Football Manager Professional</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 w-full max-h-[60vh] md:max-h-none overflow-y-auto md:overflow-visible pr-1 custom-scrollbar">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="group relative bg-white/5 border border-white/10 rounded-xl md:rounded-[2rem] p-3 md:p-6 text-left overflow-hidden transition-all hover:bg-white/10 hover:border-white/20 active:scale-95 flex flex-col justify-between h-28 md:h-44 shadow-2xl"
                  >
                    <div className={`absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity`} />
                    <div className={`p-2 md:p-4 rounded-lg md:rounded-2xl bg-gradient-to-br ${item.color} w-fit shadow-xl group-hover:scale-110 transition-transform`}>
                      <item.icon size={16} className="text-white md:hidden" />
                      <item.icon size={24} className="text-white hidden md:block" />
                    </div>
                    <div>
                      <h3 className="text-[11px] md:text-xl font-black italic uppercase tracking-tight text-white line-clamp-1">{item.label}</h3>
                      <p className="text-[7px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5 md:mt-1 opacity-60 line-clamp-1">{item.desc}</p>
                    </div>
                  </button>
                ))}

                <button
                  onClick={handleStartMatch}
                  className="col-span-2 lg:col-span-1 group relative bg-emerald-500 rounded-xl md:rounded-[2rem] p-3 md:p-6 text-left overflow-hidden shadow-2xl shadow-emerald-900/40 active:scale-95 h-28 md:h-44 flex flex-col justify-between"
                >
                  <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-white/20 blur-2xl opacity-50" />
                  <div className="p-2 md:p-4 rounded-lg md:rounded-2xl bg-white/20 w-fit shadow-xl">
                    <Play size={16} className="text-white md:hidden" fill="currentColor" />
                    <Play size={24} className="text-white hidden md:block" fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-[11px] md:text-xl font-black italic uppercase tracking-tight text-white">PLAY MATCH</h3>
                    <p className="text-[7px] md:text-xs text-emerald-950 font-black uppercase tracking-widest mt-0.5 md:mt-1">Next Fixture</p>
                  </div>
                </button>
              </div>

              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-slate-600 hover:text-white transition-colors text-[9px] md:text-[10px] font-black uppercase tracking-widest"
              >
                <LogOut size={12} className="md:w-3.5 md:h-3.5" />
                Sign Out
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="min-h-full flex flex-col"
            >
              {/* Top Navigation Bar */}
              <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 px-4 py-3 flex items-center justify-between shrink-0">
                <button
                  onClick={() => setActiveTab('hub')}
                  className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/5 transition-all active:scale-95"
                >
                  <ChevronLeft size={16} className="text-emerald-400 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Back to Hub</span>
                </button>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex flex-col items-end mr-2">
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Balance</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">€{((myTeam?.finances?.balance || 0) / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-black italic text-white shadow-lg shadow-emerald-900/20">
                    {myTeam?.name.charAt(0)}
                  </div>
                </div>
              </header>

              <div className="p-4 md:p-8 flex-1 max-w-7xl mx-auto w-full">
                {activeTab === 'dashboard' && <DashboardView team={myTeam} squad={squad} onNavigateToMarket={() => setActiveTab('scouting')} />}
                {activeTab === 'squad' && <SquadView team={myTeam} players={squad} setPlayers={setSquad} setTeam={setMyTeam} />}
                {activeTab === 'scouting' && <ScoutingView players={scoutingPlayers} myTeam={myTeam} setSquad={setSquad} setScoutingPlayers={setScoutingPlayers} setTeam={setMyTeam} />}
                {activeTab === 'finance' && <FinanceView team={myTeam} players={squad} />}
                {activeTab === 'history' && <HistoryView team={myTeam} players={squad} />}
                {activeTab === 'match' && activeMatch && (
                  <MatchSimulationView
                    match={activeMatch}
                    homeTeam={myTeam}
                    awayTeam={allTeams.find(t => t.id !== myTeam.id)!}
                    homePlayers={squad.filter(p => p.onFieldPosition)}
                    awayPlayers={scoutingPlayers.slice(0, 11)}
                    onClose={() => setActiveTab('hub')}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
