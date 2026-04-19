'use client';

import { useState } from 'react';
import { Lock, Plus, Edit, Trash, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@kristinebergpizzeria.se' && password === 'admin123') {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-charcoal px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[40px] p-10 shadow-2xl"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-brand-red" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-brand-charcoal">Admin Login</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-6 py-4 rounded-2xl border border-brand-charcoal/10 outline-none"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-6 py-4 rounded-2xl border border-brand-charcoal/10 outline-none"
              required
            />
            <button
              type="submit"
              className="w-full py-4 bg-brand-red text-white rounded-full font-bold shadow-lg"
            >
              Access Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      <aside className="w-64 bg-brand-charcoal text-white hidden lg:flex flex-col p-8">
        <div className="font-serif font-bold text-2xl mb-12 flex items-center gap-2">
          <Database className="w-6 h-6 text-brand-red" />
          <span>KP Dashboard</span>
        </div>
      </aside>

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-serif font-bold">Menu Items</h2>
          <button className="flex items-center gap-2 bg-brand-red text-white px-6 py-3 rounded-full font-bold shadow-lg">
            <Plus className="w-5 h-5" />
            Add New Dish
          </button>
        </header>

        <div className="bg-white rounded-[32px] shadow-sm border border-brand-charcoal/5 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-brand-charcoal/5">
                <th className="p-6 text-xs uppercase font-bold">Dish Name</th>
                <th className="p-6 text-xs uppercase font-bold">Price</th>
                <th className="p-6 text-xs uppercase font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-charcoal/5">
              {[
                { name: 'Margherita', price: 70 },
                { name: 'Capricciosa', price: 85 },
              ].map((item, i) => (
                <tr key={i}>
                  <td className="p-6 font-bold">{item.name}</td>
                  <td className="p-6 text-brand-red">{formatCurrency(item.price)}</td>
                  <td className="p-6">
                    <div className="flex gap-2">
                       <button className="p-2"><Edit className="w-4 h-4" /></button>
                       <button className="p-2 text-brand-red"><Trash className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
