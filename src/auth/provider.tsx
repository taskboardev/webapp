import React, { ReactNode, createContext, useContext, useState } from 'react';
import { auth } from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { authClient } from './authClient';

export interface AuthState {
  isInitialized?: boolean,
  isUserAuthenticated?: boolean,
  id?: string,
  token?: string,
  isLoading?: boolean,
  error?: auth.Error
}

export const AuthContext = createContext<AuthState>({});

export interface Props {
  children?: ReactNode
}
export function AuthProvider({ children }: Props) {
  const [user, isLoading, error] = useAuthState(authClient);
  const [isInitialized, setIsInitialized] = useState(false);
  const [token, setToken] = useState<string|undefined>(undefined);

  user?.getIdToken().then(token => {
    setToken(token);
    setIsInitialized(true);
  });

  const value: AuthState = {
    isInitialized,
    isUserAuthenticated: !!user?.uid,
    id: user?.uid,
    token,
    isLoading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
