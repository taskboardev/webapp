import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../auth';
import { useServiceContext } from '../service';

export const useAuthGuard = () => {
  const { isInitialized, isUserAuthenticated, isLoading, error } = useAuth();
  const { isClientAuthenticated } = useServiceContext();

  const router = useRouter();

  if (isLoading) {
    return <p>authenticating: reading token</p>
  }

  if (error) {
    return <p>error</p>
  }

  if (isInitialized && process.browser && !isUserAuthenticated) {
    router.push('/login');
    return <p>Redirecting you to login</p>;
  }

  if (isUserAuthenticated) {
    if (!isClientAuthenticated) {
      return <p>authenticating: preparing client</p>
    }

    return null;
  }
};
