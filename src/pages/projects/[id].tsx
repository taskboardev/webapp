import React from 'react';
import { useRouter } from 'next/router';

import { useAuthGuard } from '../../hooks/auth-hooks';
import { useAuth } from '../../auth';
import { Project } from '../../project';

export default function ProjectPage() {
  const router = useRouter();
  const guardElement = useAuthGuard();
  const { id } = useAuth();

  if (guardElement) {
    return guardElement;
  }

  return <Project id={id} />
}
