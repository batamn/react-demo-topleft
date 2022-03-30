import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';
import { DraggableCard } from "./DraggableCard";
import { Stack, Typography } from '@mui/material';

import { DragAndDropContainer } from "./DragAndDropContainer";
import './DragAndDrop.css';

//initializing items for each column
const itemsData = {
  "Column A": [
    { id: uuidv4(), title: "Item 1", subtitle: "Column A" },
    { id: uuidv4(), title: "Item 2", subtitle: "Column A" },
    { id: uuidv4(), title: "Item 3", subtitle: "Column A" },
  ],
  "Column B": [
    { id: uuidv4(), title: "Item 4", subtitle: "Column B" },
    { id: uuidv4(), title: "Item 5", subtitle: "Column B" }
  ],
  "Column C": [
    { id: uuidv4(), title: "Item 6", subtitle: "Column C" },
  ]
};

//initializing columns: param(columnNumber: number)
const columnsData = columnNumber => {
  let columns = {};
  for (let i = 0; i < columnNumber; i++) {
    let alphabetChar = String.fromCharCode(65 + i);
    columns = {
      ...columns,
      [`Column ${i}`]: {
        name: `Column ${alphabetChar}`,
        items: itemsData[`Column ${alphabetChar}`] ?? [],
      }
    };
  }
  return columns;
};

export const DragAndDrop = () => {
  //setting column list
  const [columns, setColumns] = useState(columnsData(3));

  //for onDragEnd prop function
  const onDragEnd = result => {
    if (!result.destination) return;
    const { source, destination } = result;

    //moving to different column
    if (source.droppableId !== destination.droppableId) {
      const sourceDroppable = columns[source.droppableId];
      const destDroppable = columns[destination.droppableId];
      const sourceItems = [...sourceDroppable.items];
      const destItems = [...destDroppable.items];
      const [moved] = sourceItems.splice(source.index, 1);
      moved.subtitle = destDroppable.name; //changing subtitle name
      destItems.splice(destination.index, 0, moved);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceDroppable,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destDroppable,
          items: destItems
        }
      });
    } else { //moving to same column and reordering
      const droppable = columns[source.droppableId];
      const duplicateItems = [...droppable.items];
      const [removed] = duplicateItems.splice(source.index, 1);
      duplicateItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...droppable,
          items: duplicateItems
        }
      });
    }
  };

  return (
    <DragAndDropContainer onDragEnd={onDragEnd}>
      {Object.entries(columns).map(([columnId, column], index) => {
        return (
          <div key={columnId}>
            <Typography variant="h5">{column.name}</Typography>
            <Droppable droppableId={columnId} key={columnId}>
              {(provided, snapshot) => {
                return (
                  <Stack
                    {...provided.droppableProps}
                    className="ColumnContainer"
                    sx={{ bgcolor: "secondary.main" }}
                    ref={provided.innerRef}
                    gap={1}
                  >
                    {column.items.map((item, index) => {
                      return (
                        <DraggableCard
                          key={item.id}
                          item={item}
                          index={index} />
                      );
                    })}
                    {provided.placeholder}

                  </Stack>
                );
              }}
            </Droppable>
          </div>
        );
      })}
    </DragAndDropContainer>
  );
}