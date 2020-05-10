import React, { ReactNode } from 'react';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { ProjectData, emptyProjectData, reducer } from '@taskboar/model';

export interface StoreProviderProps {
  children: ReactNode,
  state?: ProjectData,
}

export function StoreProvider({
  children,
  state = emptyProjectData,
}: StoreProviderProps) {
  // @ts-ignore
  const store = createStore(reducer, state, composeWithDevTools());

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
