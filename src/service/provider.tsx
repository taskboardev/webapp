import React, { ReactNode, createContext, useContext } from 'react';

import { useAuth } from '../auth';
import { ServiceClient } from './client';

const ServiceContext = createContext<ServiceClient|undefined>(undefined);

export interface Props {
  children: ReactNode
}

const client = new ServiceClient();

export function ServiceProvider({ children }: Props) {
  const { token } = useAuth();

  client.setToken(token);

  return (
    <ServiceContext.Provider value={client}>
      {children}
    </ServiceContext.Provider>
  );
}

export const useService = (): ServiceClient => useContext(ServiceContext);
