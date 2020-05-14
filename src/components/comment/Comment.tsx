import React, { ReactNode, useState } from 'react';
import Typography from '@material-ui/core/Typography';

import NewComment from './NewComment';
import { TextButton, DeleteButton } from '../buttons';
import { useStyles } from './styles';

export interface Props {
  value: string,
  childComments?: ReactNode,
  onSubmitReply?: (value: string) => void,
  onDelete?: () => void,
}

export default function Comment({
  value,
  childComments,
  onSubmitReply,
  onDelete,
}: Props) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const classNames = useStyles();

  const handleSubmitReply = (replyValue: string) => {
    if (onSubmitReply) {
      onSubmitReply(replyValue);
    }

    setIsReplyOpen(false);
  };

  const handleCancelReply = () => setIsReplyOpen(false);

  return (
    <div className={classNames.comment}>
      <div className={classNames.commentHeader}>
        <Typography>{value}</Typography>
        {onDelete && <DeleteButton onClick={onDelete} />}
      </div>

      <TextButton onClick={() => setIsReplyOpen(true)} color="primary">Reply</TextButton>

      {isReplyOpen &&
      <div className={classNames.childrenContainer}>
        <NewComment onSubmit={handleSubmitReply} onCancel={handleCancelReply}/>
      </div>
      }

      <div className={classNames.childrenContainer}>
        {childComments}
      </div>
    </div>
  );
}
