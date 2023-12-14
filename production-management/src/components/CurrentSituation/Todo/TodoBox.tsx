// TodoBox.tsx
import React, { FC } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Box, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

interface TodoBoxProps {
    id: number;
    content: string;
    provided: DraggableProvided;
    snapshot: DraggableStateSnapshot;
    onDelete: (id: number) => void;
}

class TodoBox extends Component<TodoBoxProps> {
    render() {
        const { id, content, provided, snapshot, onDelete } = this.props;

        return (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                    userSelect: 'none',
                    padding: 3,
                    margin: '0 0 8px 0',
                    minHeight: '20px',
                    backgroundColor: snapshot.isDragging ? '#b4b4b4' : 'white',
                    border: '1px solid #ddd',
                    position: 'relative', // Added position relative
                    paddingLeft: '10px',
                    ...provided.draggableProps.style,
                }}
            >
                {content}
                <IconButton
                    onClick={() => onDelete(id)}
                    color="secondary"
                    style={{
                        position: 'absolute',
                        right: '8px',
                        marginTop: '-14px',
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </div>
        );
    }
}

export default TodoBox;
