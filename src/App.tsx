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
  LogOut
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
  const [activeTab, setActiveTab] = useState('dashboard');
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
    if (!myTeam || allTeams.length < 1 || squad.length < 11) {
      alert("You need at least 11 players in your squad to play a match!");
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

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'squad', label: 'Squad & Tactics', icon: Users },
    { id: 'scouting', label: 'Scouting', icon: Search },
    { id: 'finance', label: 'Finances', icon: DollarSign },
    { id: 'history', label: 'History', icon: History },
  ];

  if (authLoading) return <div className="flex items-center justify-center h-screen bg-slate-950 text-white">Loading...</div>;
  if (!user) return <LoginView onLogin={handleLogin} />;
  if (!myTeam) return <div className="flex items-center justify-center h-screen bg-slate-950 text-white">Loading Club Data...</div>;

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30 overflow-hidden flex-col lg:flex-row">
      {/* Mobile Header */}
      <header className="lg:hidden h-16 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-6 shrink-0 z-20">
        <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent flex items-center gap-2">
          <Trophy className="text-blue-400" size={20} />
          FM Pro
        </h1>
        <div className="flex items-center gap-4">
          <button onClick={handleStartMatch} className="p-2 bg-emerald-600 rounded-lg text-white">
            <Play size={16} fill="currentColor" />
          </button>
          <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-white">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex w-64 border-r border-slate-800 bg-slate-900/50 flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent flex items-center gap-2">
            <Trophy className="text-blue-400" size={24} />
            FM Pro
          </h1>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-500/10 text-blue-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={handleStartMatch}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
          >
            <Play size={18} fill="currentColor" />
            Next Match
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all active:scale-95 text-sm"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 pb-20 lg:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-4 md:p-8 max-w-7xl mx-auto"
          >
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
                homePlayers={squad}
                awayPlayers={scoutingPlayers.slice(0, 11)}
                onClose={() => setActiveTab('dashboard')}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav (Mobile) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 flex items-center justify-around px-2 z-20">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
              activeTab === item.id ? 'text-blue-400' : 'text-slate-500'
            }`}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
