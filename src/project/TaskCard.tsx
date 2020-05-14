import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

import { OptionsPopper } from '../components/options-popper';
import { TextButton } from '../components/buttons';

import { hooks } from './store';
import TaskOptions from './TaskOptions';
import TaskEditorForm from './TaskEditorForm';
import TaskDetails from './TaskDetails';
import { useCardStyles } from './styles';


export interface Props {
  id: string,
  statusId: string,
  dragHandleProps: DraggableProvidedDragHandleProps
}

export default function TaskCard({ id, dragHandleProps }: Props) {
  const classNames = useCardStyles();

  const updateTask = hooks.useUpdateTask();
  const deleteTask = hooks.useDeleteTask();
  const { title, description, assigneeId } = hooks.useTask(id);

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

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const openDetails = () => setIsDetailsOpen(true);
  const closeDetails = () => setIsDetailsOpen(false);

  return (
    <Paper className={classNames.task} {...dragHandleProps}>
      <div className={classNames.taskHeader}>
        <Typography className={classNames.title}>{title}</Typography>

        <OptionsPopper>
          <TaskOptions
            onClickEdit={openEditor}
            onClickDelete={handleClickDelete}
          />
        </OptionsPopper>
      </div>

      {isEditorOpen &&
      <Dialog open={isEditorOpen}>
        <Paper className={classNames.dialog}>
          <TaskEditorForm
            title={title}
            description={description}
            onSubmit={handleSubmitEdit}
            onCancel={closeEditor}
          />
        </Paper>
      </Dialog>
      }

      <TextButton onClick={openDetails}>View Task</TextButton>
      {isDetailsOpen &&
      <TaskDetails id={id} isOpen={isDetailsOpen} close={closeDetails} />
      }
    </Paper>
  );
}

