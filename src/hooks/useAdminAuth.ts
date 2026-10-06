import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export interface AdminAuthState {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  isConfigured: boolean;
  signIn: (email: string, pass: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const ADMIN_STORAGE_KEY = 'ss_admin_auth_user_v1';
export const AUTHORIZED_ADMIN_EMAIL = 'saisrikarkokku7674@gmail.com';
export const AUTHORIZED_ADMIN_PASS = 'Anasurya@kokku.';

export function useAdminAuth(): AdminAuthState {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return typeof window !== 'undefined' && sessionStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleStorageSync = () => {
      try {
        setIsAdmin(sessionStorage.getItem(ADMIN_STORAGE_KEY) === 'true');
      } catch {
        // Ignore storage access errors
      }
    };

    window.addEventListener('admin-auth-changed', handleStorageSync);

    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return () => window.removeEventListener('admin-auth-changed', handleStorageSync);
    }

    async function checkRole(currentUser: User | null) {
      if (!currentUser) {
        if (sessionStorage.getItem(ADMIN_STORAGE_KEY) !== 'true') {
          setIsAdmin(false);
        }
        setIsLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', currentUser.id)
          .single();

        if (!error && data?.role === 'admin') {
          sessionStorage.setItem(ADMIN_STORAGE_KEY, 'true');
          setIsAdmin(true);
        } else if (sessionStorage.getItem(ADMIN_STORAGE_KEY) !== 'true') {
          setIsAdmin(false);
        }
      } catch {
        if (sessionStorage.getItem(ADMIN_STORAGE_KEY) !== 'true') {
          setIsAdmin(false);
        }
      } finally {
        setIsLoading(false);
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      checkRole(currentUser);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      checkRole(currentUser);
    });

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('admin-auth-changed', handleStorageSync);
    };
  }, []);

  const signIn = async (email: string, pass: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (isSupabaseConfigured) {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password: cleanPass,
        });

        if (error) {
          // If network failure or credentials check fails on Supabase, check authorized credentials
          if (trimmedEmail === AUTHORIZED_ADMIN_EMAIL.toLowerCase() && cleanPass === AUTHORIZED_ADMIN_PASS) {
            try {
              sessionStorage.setItem(ADMIN_STORAGE_KEY, 'true');
            } catch {}
            setIsAdmin(true);
            window.dispatchEvent(new Event('admin-auth-changed'));
            setIsLoading(false);
            return { error: null };
          }
          setIsLoading(false);
          return { error: new Error('Invalid credentials. Access restricted to store administrator.') };
        }

        if (data?.user) {
          setUser(data.user);
          // Query profiles table for role
          const { data: profile, error: profErr } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .single();

          if (!profErr && profile?.role === 'admin') {
            try {
              sessionStorage.setItem(ADMIN_STORAGE_KEY, 'true');
            } catch {}
            setIsAdmin(true);
            window.dispatchEvent(new Event('admin-auth-changed'));
            setIsLoading(false);
            return { error: null };
          } else {
            await supabase.auth.signOut();
            setIsLoading(false);
            return { error: new Error('Access denied: This user account does not have administrator privileges.') };
          }
        }
      } catch (err: any) {
        if (trimmedEmail === AUTHORIZED_ADMIN_EMAIL.toLowerCase() && cleanPass === AUTHORIZED_ADMIN_PASS) {
          try {
            sessionStorage.setItem(ADMIN_STORAGE_KEY, 'true');
          } catch {}
          setIsAdmin(true);
          window.dispatchEvent(new Event('admin-auth-changed'));
          setIsLoading(false);
          return { error: null };
        }
        setIsLoading(false);
        return { error: new Error(err?.message || 'Authentication error') };
      }
    }

    // Offline mode: strict credentials check
    if (trimmedEmail === AUTHORIZED_ADMIN_EMAIL.toLowerCase() && cleanPass === AUTHORIZED_ADMIN_PASS) {
      try {
        sessionStorage.setItem(ADMIN_STORAGE_KEY, 'true');
      } catch {}
      setIsAdmin(true);
      window.dispatchEvent(new Event('admin-auth-changed'));
      return { error: null };
    }

    return { error: new Error('Access denied: Invalid credentials. Only authorized administrator can access the portal.') };
  };

  const signOut = async () => {
    try {
      sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch {}
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch {}
    }
    setUser(null);
    setIsAdmin(false);
    window.dispatchEvent(new Event('admin-auth-changed'));
  };

  return { user, isAdmin, isLoading, isConfigured: isSupabaseConfigured, signIn, signOut };
}
