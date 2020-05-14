import React from 'react';

import { Comment as CommentView } from '../components/comment';
import { hooks, emptyArray } from './store';

export interface Props {
  id: string,
  taskId?: string,
  parentCommentId?: string,
}
export default function Comment({ id }: Props) {
  const comment = hooks.useComment(id);
  const createChildComment = hooks.useCreateChildComment();

  if (!comment) {
    return null;
  }

  const { value, childCommentIds } = comment;

  const handleSubmitReply = (value: string) => {
    createChildComment({ value, parentCommentId: id });
  };

  const childCommentsElement = (
    <>{(childCommentIds || emptyArray).map(childId => <Comment key={childId} id={childId}/>)}</>
  );

  return (
    <CommentView
      value={value}
      childComments={childCommentsElement}
      onSubmitReply={handleSubmitReply}
    />
  );
}
