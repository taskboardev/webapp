import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../auth';

export const useAuthGuard = () => {
  const auth = useAuth();
  const router = useRouter();

  if (auth.isLoading) {
    return <p>loading</p>
  }

  if (auth.error) {
    return <p>error</p>
  }

  if (auth.isInitialized && process.browser) {
    router.push('/login');
    return <p>Redirecting you to login</p>;
  }

  if (auth.isAuthenticated) {
    return null;
  }
};
