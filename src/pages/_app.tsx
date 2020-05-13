import React from 'react';
import { AuthProvider } from '../auth';
import { ServiceProvider } from '../service';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ServiceProvider>
        <Component {...pageProps} />
      </ServiceProvider>
    </AuthProvider>
  )
}
