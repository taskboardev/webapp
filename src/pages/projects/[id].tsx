import React from 'react';
import { useRouter } from 'next/router';

import { useAuthGuard } from '../../hooks/auth-hooks';
import { Project } from '../../project';

export default function ProjectPage() {
  const guardElement = useAuthGuard();
  const router = useRouter();

  if (guardElement) {
    return guardElement;
  }

  const { id } = router.query;

  return <Project id={id as string} />
}
