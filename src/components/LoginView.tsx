import { useState, FormEvent } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  setDoc, 
  doc 
} from 'firebase/firestore';
import { motion } from 'motion/react';
import { Trophy, LogIn, UserPlus, Lock, User } from 'lucide-react';
import { User as UserType } from '../types';

interface LoginViewProps {
  onLogin: (user: UserType) => void;
}

export default function LoginView({ onLogin }: LoginViewProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const usersRef = collection(db, 'Users');

      if (isRegistering) {
        // Check if username already exists
        const q = query(usersRef, where('username', '==', username));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          throw new Error('Username already exists');
        }

        const userId = `u-${Date.now()}`;
        const newUser: UserType = {
          id: userId,
          username,
          password, // Storing plain text as requested (Note: Not secure for production)
          teamId: null
        };

        await setDoc(doc(db, 'Users', userId), newUser);
        onLogin(newUser);
      } else {
        // Custom Login check
        const q = query(usersRef, where('username', '==', username), where('password', '==', password));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          throw new Error('Invalid username or password');
        }

        const userData = querySnapshot.docs[0].data() as UserType;
        onLogin(userData);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-slate-950 flex items-center justify-center p-6 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/images/soccer_stadium_dark_glassy_1782856262108.jpg" 
          alt="Stadium Background" 
          className="w-full h-full object-cover scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/90" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-600/10 mb-6 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <Trophy className="text-emerald-400" size={40} />
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase leading-none">FM PRO</h1>
          <p className="text-slate-400 mt-3 font-semibold uppercase tracking-[0.2em] text-[10px]">Strategic Excellence Awaits</p>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {isRegistering ? <UserPlus size={22} /> : <LogIn size={22} />}
            </div>
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tight">
              {isRegistering ? 'Draft Your Career' : 'Manager Entrance'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Username / ID</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-700"
                  placeholder="TheSpecialOne"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Access Token</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-700"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold flex items-center gap-2"
              >
                <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-900/40 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-900/30 transition-all active:scale-[0.98] mt-4 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              {loading ? 'Validating...' : (isRegistering ? 'Initialize Contract' : 'Access Tactical Suite')}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-slate-500 hover:text-emerald-400 text-xs font-black uppercase tracking-widest transition-all"
            >
              {isRegistering ? 'Already Licensed? Sign In' : "New Manager? Create Profile"}
            </button>
          </div>
        </div>

        <p className="text-center text-slate-700 text-[9px] font-bold uppercase tracking-widest mt-10">
          Professional Grade Simulation • Real-time Data Sync
        </p>
      </motion.div>
    </div>
  );
}
