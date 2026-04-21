import { ReactNode, useState } from 'react';
import { Button } from '../app/components/ui/button';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="bg-slate-800 rounded-lg shadow-2xl p-8 w-full max-w-md border border-slate-700">
          <h1 className="text-3xl font-bold text-center mb-2 text-white">Admin Access</h1>
          <p className="text-center text-slate-300 mb-6">Sign in to your admin account</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="Admin email"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Password"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
            <p className="text-xs text-slate-400 text-center">
              Demo: admin@foundation.org / password123
            </p>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

