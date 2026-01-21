'use client';

import { createContext, useContext, useState } from 'react';
import { saveAuth, clearAuth, getToken, getRoles } from '@/utils/authStorage';
import { useRouter } from 'next/navigation';
import { login as loginService } from '@/services/auth.services';

type AuthState = {
  token: string | null;
  roles: string[];
  loading: boolean;
};

type AuthContextType = {
  token: string | null;
  roles: string[];
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    if (typeof window === 'undefined') {
      return { token: null, roles: [], loading: true };
    }

    return {
      token: getToken(),
      roles: getRoles(),
      loading: false,
    };
  });

  const router = useRouter();

  const login = async (username: string, password: string) => {
    const { token, roles } = await loginService({ username, password });
    saveAuth(token, roles);
    setState({ token, roles, loading: false });
    router.push('/filmes');
  };

  const logout = () => {
    clearAuth();
    setState({ token: null, roles: [], loading: false });
    router.push('/login');
  };

  const hasRole = (role: string) =>
    state.roles.includes(role) || state.roles.includes(`ROLE_${role}`);

  if (state.loading) return null;

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        roles: state.roles,
        loading: state.loading,
        isAuthenticated: !!state.token,
        hasRole,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}
