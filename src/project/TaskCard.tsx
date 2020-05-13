import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

import { OptionsPopper } from '../components/options-popper';
import { NewComment } from '../components/comment';

import { hooks, emptyArray } from './store';
import TaskOptions from './TaskOptions';
import TaskEditorForm from './TaskEditorForm';
import Comment from './Comment';
import { useCardStyles } from './styles';


export interface Props {
  id: string,
  statusId: string,
  dragHandleProps: DraggableProvidedDragHandleProps
}

export default function TaskCard({ id, dragHandleProps }: Props) {
  const classes = useCardStyles();

  const updateTask = hooks.useUpdateTask();
  const deleteTask = hooks.useDeleteTask();
  const createComment = hooks.useCreateRootComment();
  const { title, description, rootCommentIds } = hooks.useTask(id);

  const [isCommentFormShown, setIsCommentFormShown] = useState(false);
  const showCommentForm = () => setIsCommentFormShown(true);
  const hideCommentForm = () => setIsCommentFormShown(false);
  const handleSubmitComment = (value: string) => {
    createComment({ value, taskId: id });
    hideCommentForm();
  };

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const openEditor = () => setIsEditorOpen(true);
  const closeEditor = () => setIsEditorOpen(false);
  const handleSubmitEdit = (title: string, description: string) => {
    if (updateTask) {
      updateTask(id, { title, description });
    }
    closeEditor();
  };
  const handleClickDelete = () => {
    if (deleteTask) {
      deleteTask(id);
    }
  };

  return (
    <Paper className={classes.task} {...dragHandleProps}>
      <div className={classes.taskHeader}>
        <Typography>{title}</Typography>

        <OptionsPopper>
          <TaskOptions
            onClickEdit={openEditor}
            onClickDelete={handleClickDelete}
          />
        </OptionsPopper>
      </div>

      {isEditorOpen &&
      <Dialog open={isEditorOpen}>
        <Paper className={classes.dialog}>
          <TaskEditorForm
            title={title}
            description={description}
            onSubmit={handleSubmitEdit}
            onCancel={closeEditor}
          />
        </Paper>
      </Dialog>
      }

      <div>
        {!isCommentFormShown &&
        <button onClick={showCommentForm}>Reply</button>
        }

        {isCommentFormShown &&
        <NewComment
          onSubmit={handleSubmitComment}
          onCancel={hideCommentForm}
        />
        }
      </div>

      <div>
        {(rootCommentIds || emptyArray).map(commentId => (
          <Comment id={commentId} />
        ))}
      </div>
    </Paper>
  );
}

