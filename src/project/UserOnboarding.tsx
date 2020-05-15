import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useOnboardingStyles } from './styles';

export interface Props {
  id: string,
  onSubmit: (value: string) => void
}
export default function UserOnboarding({ id, onSubmit }: Props) {
  const [name, setName] = useState('');
  const cleanedName = name.trim();

  const handleClickSubmit = () => {
    if (cleanedName) {
      onSubmit(cleanedName);
    }
  };

  const classNames = useOnboardingStyles();

  return (
    <Dialog open={true} fullWidth disableEscapeKeyDown disableBackdropClick>
      <div className={classNames.onboarding}>
        <Typography>Welcome!</Typography>

        <TextField
          placeholder="Display name:"
          value={cleanedName}
          onChange={e => setName(e.target.value)}
        />

        <div>
          <Button onClick={handleClickSubmit} color="primary">Start!</Button>
        </div>
      </div>
    </Dialog>
  );
}
