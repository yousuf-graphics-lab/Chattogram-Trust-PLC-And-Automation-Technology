import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { AdminSession } from '@/types';
import {
  ADMIN_CREDENTIALS,
} from '@/lib/site';
import { createSession, destroySession, getSession } from '@/lib/storage';

interface AdminContextValue {
  session: AdminSession | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
}

const AdminContext = createContext<AdminContextValue>({
  session: null,
  isAuthenticated: false,
  login: () => ({ ok: false }),
  logout: () => undefined,
});

export function AdminProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(() => getSession());

  const login = useCallback((username: string, password: string) => {
    if (
      username.trim() === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const s = createSession(username.trim());
      setSession(s);
      return { ok: true };
    }
    return { ok: false, error: 'Invalid username or password. Please try again.' };
  }, []);

  const logout = useCallback(() => {
    destroySession();
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({ session, isAuthenticated: !!session, login, logout }),
    [session, login, logout]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  return useContext(AdminContext);
}
