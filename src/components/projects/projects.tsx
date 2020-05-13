import { useState } from 'react';
import { useAsync, useAsyncCallback } from 'react-async-hook';
import { useService } from '../../service';
import { useRouter } from 'next/router';

interface Props {
  userId: string,
}

export default function Projects({ userId }: Props) {
  const service = useService();
  const { error, loading, result } = useAsync<Record<string, string>>(
    service.getUserProjectTitles.bind(service), [userId]
  );

  return (
    <div>
      <NewProject/>


    </div>
  );
}

export function NewProject() {
  const service = useService();
  const router = useRouter();
  const [title, setTitle] = useState('');

  const { execute, loading, error, result: createdId } = useAsyncCallback(service.createNewProject.bind(service));

  if (createdId) {
    router.push(`/projects/${createdId}`);
    return null;
  }

  const handleClick = () => {
    const cleaned = title.trim();
    if (!!cleaned) {
      setTitle('');
      execute(title);
    }
  };

  return (
    <div>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={handleClick}>Create</button>
      {loading && <span>Creating ...</span>}
      {error && <span>Error</span>}
    </div>
  );
}
