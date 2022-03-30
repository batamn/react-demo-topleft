import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Container } from '@mui/material';
import './DragAndDrop.css';

//Drag and drop container: param(onDragEnd - function, children - components)
export const DragAndDropContainer = ({ onDragEnd, children }) => {
  return (
    <Container className="DragContainer">
      <DragDropContext
        onDragEnd={result => onDragEnd(result)}
      >
        {children}
      </DragDropContext>
    </Container>
  )
};