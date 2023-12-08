import React, { Component } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import TodoBox from './TodoBox';
import { Box } from '@material-ui/core';

interface TodoItem {
    id: string;
    content: string;
    status: string;
}

interface TodoListState {
    todo: TodoItem[];
    doing: TodoItem[];
    done: TodoItem[];
    inputValue: string;
    isInputOpen: boolean;
}

const TodoStyle = {
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    minHeight: '140px',
    maxHeight: '140px',
    marginBottom: '1%',
    marginTop: '2%',
    marginRight: '2%',
    flexGrow: 1,
    padding: '2%',
    borderRadius: '8px',
    overflow: 'auto',
    backgroundColor:'#F3F3F3',
};

const Todoinput = {
    width: '100%',
    height: '100%',
    borderRadius: '20px',
    border: 0,
    boxShadow: '0 1px 7px rgba(0, 0, 0, 0.15)',
    paddingLeft: '5%',
    marginLeft:'5%',
    marginTop:'-5%'
};

const addTodoButtonImage = require('../../../images/button/add-todo-button.png');


class TodoList extends Component<{}, TodoListState> {
    state: TodoListState = {
        todo: [],
        doing: [],
        done: [],
        inputValue: '',
        isInputOpen: false,
    };

    onDragEnd = (result: DropResult): void => {
        if (!result.destination) {
            return;
        }

        const { source, destination } = result;

        if (!source || !destination || source.droppableId === destination.droppableId) {
            return;
        }

        const sourceId = source.droppableId as keyof TodoListState;
        const destinationId = destination.droppableId as keyof TodoListState;

        const updatedItems = [...this.state[sourceId] as TodoItem[]];
        const [reorderedItem] = updatedItems.splice(source.index, 1);

        this.setState((prevState) => ({
            ...prevState,
            [sourceId]: updatedItems,
            [destinationId]: [...(prevState[destinationId] as TodoItem[] || []), reorderedItem],
        }));
    };

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ inputValue: event.target.value });
    };

    handleTodoSubmit = (): void => {
        const { inputValue } = this.state;

        if (inputValue.trim() !== '') {
            const newTodo = {
                id: String(Date.now()),
                content: inputValue,
                status: 'todo',
            };

            this.setState((prevState) => ({
                todo: [...(prevState.todo as TodoItem[]), newTodo],
                inputValue: '',
                isInputOpen: false,
            }));
        }
    };

    handleDelete = (id: string): void => {
        this.setState((prevState: TodoListState) => ({
            todo: prevState.todo.filter((item: TodoItem) => item.id !== id),
            doing: prevState.doing.filter((item: TodoItem) => item.id !== id),
            done: prevState.done.filter((item: TodoItem) => item.id !== id),
        }));
    };

    toggleInput = (): void => {
        this.setState((prevState) => ({
            ...prevState,
            isInputOpen: !prevState.isInputOpen,
        }));
    };

    render() {
        return (
            <Box>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div style={{ display: 'flex' }}>
                        <Droppable droppableId="todo" direction="vertical">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={TodoStyle}
                                >
                                    <div style={{ display: 'flex' }}>
                                        <h2 style={{ marginTop: '0%',color:'#F595BA'}}>Todo list</h2>
                                        <form
                                            style={{ display: 'flex' }}
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                this.handleTodoSubmit();
                                            }}
                                        >
                                            {this.state.isInputOpen ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        style={Todoinput}
                                                        value={this.state.inputValue}
                                                        onChange={this.handleInputChange}
                                                        placeholder="할 일을 입력하세요"
                                                    />
                                                </>
                                            ) : (
                                                <div
                                                    onClick={this.toggleInput}
                                                    style={{
                                                        width: '30px',
                                                        height: '30px',
                                                        marginLeft: '5px',
                                                        backgroundImage: `url(${addTodoButtonImage})`,
                                                        backgroundSize: 'cover',
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                            )}
                                        </form>
                                    </div>
                                    {this.state.todo.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided, snapshot) => (
                                                <TodoBox
                                                    id={item.id}
                                                    content={item.content}
                                                    provided={provided}
                                                    snapshot={snapshot}
                                                    onDelete={this.handleDelete}
                                                />
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <Droppable droppableId="done" direction="vertical">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={TodoStyle}
                                >
                                    <h2 style={{ marginTop: '0%',color:'#3A4CA8' }}>Finish</h2>
                                    {this.state.done.map((item, index) => (
                                        <Draggable key={item.id || index} draggableId={item.id || index.toString()} index={index}>
                                            {(provided, snapshot) => (
                                                <TodoBox
                                                    id={item.id}
                                                    content={item.content}
                                                    provided={provided}
                                                    snapshot={snapshot}
                                                    onDelete={this.handleDelete}
                                                />
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </DragDropContext>
            </Box>
        );
    }
}

export default TodoList;