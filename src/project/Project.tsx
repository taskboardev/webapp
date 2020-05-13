import { useAsync } from 'react-async-hook';
import { Project } from '@taskboar/model';

import { useService } from '../service';
import { StoreProvider } from './store';
import ProjectBoard from './ProjectBoard';

export interface Props {
  id: string
}
export default function Project({ id }: Props) {
  const service = useService();
  const { error, loading, result } = useAsync<Project>(service.getProject.bind(service), [id]);

  if (loading) {
    return <p>loading project</p>
  }

  if (error) {
    return <p>error loading project</p>
  }

  return (
    <StoreProvider state={result.data}>
      <ProjectBoard/>
    </StoreProvider>
  );
}
