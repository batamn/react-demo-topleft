import React from 'react';
import { Card, CardHeader } from '@mui/material';
import { Draggable } from "react-beautiful-dnd";
import './DragAndDrop.css';

//Draggable Card Param(item: id, title subtitle, index: number)
export const DraggableCard = ({ item, index }) => {
  const { id, title, subtitle } = item;
  return (
    <Draggable
      draggableId={id}
      index={index}
    >
      {(provided, snapshot) => {
        return (
          <Card
            className='DraggableCard'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{
              backgroundColor: snapshot.isDragging
                ? "secondary.light"
                : "secondary.dark",
              ...provided.draggableProps.style
            }}>
            <CardHeader
              title={title}
              subheader={subtitle}
            />
          </Card>
        );
      }}
    </Draggable>
  )
}