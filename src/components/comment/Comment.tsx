import React, { ReactNode, useState } from 'react';
import Typography from '@material-ui/core/Typography';

import NewComment from './NewComment';

export interface Props {
  value: string,
  childComments?: ReactNode,
  onSubmitReply?: (value: string) => void,
}

export default function Comment({
  value,
  childComments,
  onSubmitReply,
}: Props) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const handleSubmitReply = (replyValue: string) => {
    if (onSubmitReply) {
      onSubmitReply(replyValue);
    }

    setIsReplyOpen(false);
  };

  const handleCancelReply = () => setIsReplyOpen(false);

  return (
    <div>
      <Typography>{value}</Typography>

      <button onClick={() => setIsReplyOpen(true)}>Reply</button>

      {isReplyOpen &&
      <NewComment onSubmit={handleSubmitReply} onCancel={handleCancelReply}/>
      }

      <div style={{ marginLeft: 20 }}>
      {childComments}
      </div>
    </div>
  );
}
