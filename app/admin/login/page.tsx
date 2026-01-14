'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-md w-full mx-auto px-6 relative z-10">
        <div className="bg-brand-dark/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-brand-secondary/20 p-10">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="w-24 h-24 mx-auto bg-brand-secondary/10 rounded-full flex items-center justify-center mb-6 border border-brand-secondary/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              <span className="text-brand-secondary font-serif font-bold text-4xl">NS</span>
            </div>
            <h1 className="text-3xl font-serif font-bold text-brand-secondary mb-2">
              Pristup administratoru
            </h1>
            <p className="text-brand-primary/60 text-sm tracking-wider uppercase">
              Njata Shiz Handcrafted
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-center text-sm font-medium">
                {error === 'Invalid email or password' ? 'Neispravan email ili lozinka' : 'Došlo je do greške. Pokušajte ponovo.'}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-brand-accent/80 mb-2 uppercase tracking-wider"
              >
                Email adresa
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-brand-primary/5 border border-brand-secondary/20 rounded-xl focus:ring-2 focus:ring-brand-secondary/50 focus:border-brand-secondary text-brand-accent placeholder-brand-primary/30 outline-none transition-all"
                placeholder="admin@njatashiz.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-brand-accent/80 mb-2 uppercase tracking-wider"
              >
                Lozinka
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-brand-primary/5 border border-brand-secondary/20 rounded-xl focus:ring-2 focus:ring-brand-secondary/50 focus:border-brand-secondary text-brand-accent placeholder-brand-primary/30 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-4 bg-brand-secondary text-brand-dark font-bold text-lg rounded-xl hover:bg-brand-secondary/90 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-2"
            >
              {isLoading ? 'Provera...' : 'Prijavi se'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
