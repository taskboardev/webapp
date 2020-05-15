import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

import { OptionsPopper } from '../components/options-popper';

import { hooks } from './store';
import TaskDetails from './TaskDetails';
import { useCardStyles } from './styles';


export interface Props {
  id: string,
  statusId: string,
  dragHandleProps: DraggableProvidedDragHandleProps
}

export default function TaskCard({ id, dragHandleProps }: Props) {
  const classNames = useCardStyles();
  const { title } = hooks.useTask(id);
  const deleteTask = hooks.useDeleteTask();
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
          <List>
            <ListItem button onClick={openDetails}>
              <ListItemText primary="Edit Task"/>
            </ListItem>
            <ListItem button onClick={handleClickDelete}>
              <ListItemText primary="Delete Task"/>
            </ListItem>
          </List>
        </OptionsPopper>
      </div>

      {isDetailsOpen &&
      <TaskDetails
        id={id}
        isOpen={isDetailsOpen}
        close={closeDetails}
      />
      }
    </Paper>
  );
}

