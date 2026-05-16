import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser, registerUser } from '../services/api';
import { Mail, Lock, User, Compass, ArrowRight, Eye, EyeOff } from 'lucide-react';

const AuthPage = ({ isLogin = true }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'tourist' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const { data } = isLogin ? await loginUser({ email: formData.email, password: formData.password }) : await registerUser(formData);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24 relative" id="auth-page">
      {/* Subtle background warmth */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-brand-100/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-sand-200/40 rounded-full blur-[100px]" />

      <div className="card p-8 w-full max-w-md relative animate-slide-up" id="auth-card">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-warm-gray-800">TouristBuddy</span>
        </div>

        <h2 className="font-display font-bold text-2xl text-warm-gray-800 text-center mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-warm-gray-500 text-center text-sm mb-8">
          {isLogin ? 'Sign in to continue your journey' : 'Join us and explore India'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" id="auth-form">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray-400" />
              <input type="text" placeholder="Full Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input-dark !pl-10" id="name-input" />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray-400" />
            <input type="email" placeholder="Email Address" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="input-dark !pl-10" id="email-input" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray-400" />
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" required minLength={6} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="input-dark !pl-10 !pr-10" id="password-input" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray-400 hover:text-warm-gray-600" id="toggle-password">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-warm-gray-700 mb-2">I am a...</label>
              <div className="grid grid-cols-2 gap-2">
                {['tourist', 'guide'].map(r => (
                  <button key={r} type="button" onClick={() => setFormData({...formData, role: r})} className={`py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${formData.role === r ? 'bg-brand-600 text-white' : 'bg-warm-gray-100 text-warm-gray-500 hover:bg-warm-gray-200 border border-warm-gray-200'}`} id={`role-${r}`}>
                    {r === 'tourist' ? '🧳 Tourist' : '🗺️ Guide'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && <div className="p-3 rounded-lg bg-error-50 border border-red-200 text-error-600 text-sm">{error}</div>}

          <button type="submit" disabled={loading} className="w-full btn-primary !py-3.5 disabled:opacity-50" id="auth-submit-btn">
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>{isLogin ? 'Sign In' : 'Create Account'} <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <p className="text-center text-sm text-warm-gray-500 mt-6">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <Link to={isLogin ? '/register' : '/login'} className="text-brand-600 hover:text-brand-700 font-medium">
            {isLogin ? 'Sign Up' : 'Sign In'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
