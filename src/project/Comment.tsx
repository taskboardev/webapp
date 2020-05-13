import React from 'react';

import { hooks } from './store';

import { Comment as CommentView } from '../components/comment';

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

  const childCommentsElement = childCommentIds.map(childId => <Comment id={childId}/>);

  return (
    <CommentView
      value={value}
      childComments={<>{childCommentsElement}</>}
      onSubmitReply={handleSubmitReply}
    />
  );
}
