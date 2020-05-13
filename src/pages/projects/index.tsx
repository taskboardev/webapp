import React from 'react';

import { useAuthGuard } from '../../hooks/auth-hooks';
import { useAuth } from '../../auth';
import { Projects } from '../../components/projects';

export default function ProjectsPage() {
  const guardElement = useAuthGuard();
  const { id } = useAuth();

  if (guardElement) {
    return guardElement;
  }

  return <Projects userId={id} />
};
