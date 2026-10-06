import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Lock, AlertCircle, CheckCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenPortal?: () => void;
}

export const AdminLoginModal: React.FC<Props> = ({ isOpen, onClose, onOpenPortal }) => {
  const { signIn, isAdmin, signOut } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    const { error } = await signIn(email, password);
    setIsSubmitting(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      onClose();
      if (onOpenPortal) {
        onOpenPortal();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-md border border-dasara-gold/40 bg-zinc-950 p-6 text-white sm:rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-dasara-gold">
            <Lock className="h-5 w-5" />
            <span className="text-xs font-bold tracking-widest uppercase">Admin Gateway</span>
          </div>
          <DialogTitle className="font-serif text-2xl text-dasara-champagne">
            Store Management Portal
          </DialogTitle>
        </DialogHeader>

        {isAdmin ? (
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-emerald-400">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm">You are logged in with <strong>Store Admin privileges</strong>. Ready to manage inventory and photos.</p>
            </div>
            <Button
              onClick={() => {
                onClose();
                if (onOpenPortal) onOpenPortal();
              }}
              className="w-full bg-dasara-gold hover:bg-dasara-goldLight text-black font-bold py-5 rounded-xl cursor-pointer shadow-lg shadow-dasara-gold/20"
            >
              Launch Store Operations Hub
            </Button>
            <Button
              variant="outline"
              onClick={signOut}
              className="w-full border-red-500/40 text-red-400 hover:bg-red-500/10 cursor-pointer"
            >
              Sign Out from Admin
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="flex items-center gap-2 rounded-lg bg-zinc-900/90 border border-dasara-gold/30 p-2.5 text-xs text-dasara-champagne">
              <Lock className="h-4 w-4 text-dasara-gold shrink-0" />
              <span>Restricted Storefront Management. Enter authorized admin credentials to access catalog and pricing controls.</span>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 rounded-lg bg-red-950/50 border border-red-500/40 p-3 text-xs text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label htmlFor="admin-email-input" className="text-xs font-semibold text-zinc-300">Admin Email</label>
              <input
                id="admin-email-input"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="saisrikarkokku7674@gmail.com"
                className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:border-dasara-gold focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="admin-password-input" className="text-xs font-semibold text-zinc-300">Password</label>
              <input
                id="admin-password-input"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:border-dasara-gold focus:outline-none"
              />
            </div>
            <Button
              type="submit"
              variant="gold"
              disabled={isSubmitting}
              className="w-full py-5 text-sm"
            >
              {isSubmitting ? 'Authenticating...' : 'Enter Admin Management Portal'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
