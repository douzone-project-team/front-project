import React, { Component } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import TodoBox from './TodoBox';
import { Box } from '@material-ui/core';
import './button.css';

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
    todoIsCollapsed: boolean;
    doingIsCollapsed: boolean;
    doneIsCollapsed: boolean;
}

const TodoStyle = {
    width: '21vw',
    maxWidth:'21vw',
    /*    height: this.state.todoIsCollapsed ? '130px' : 'auto',*/
    height:'auto',
    minHeight: '25vh',
    maxHeight:'25vh',
    marginBottom:'1%',
    flexGrow: 1,
    padding: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'auto',
}

const Todoinput = {
    width: '17.2vw',
    height: '3vw',
    borderRadius:'20px',
    border:0,
    marginBottom:'5px',
    boxShadow: '0 1px 7px rgba(0, 0, 0, 0.15)',
    paddingLeft:'10px',
}
class TodoList extends Component<{}, TodoListState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            todo: [],
            doing: [],
            done: [],
            inputValue: '',
            todoIsCollapsed: false,
            doingIsCollapsed: false,
            doneIsCollapsed: false,
        };
    }

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

        const updatedItems = [...this.state[sourceId] as TodoItem[]]; // 수정된 부분
        const [reorderedItem] = updatedItems.splice(source.index, 1);

        this.setState((prevState) => ({
            ...prevState,
            [sourceId]: updatedItems,
            [destinationId]: [...(prevState[destinationId] as TodoItem[]), reorderedItem],
        }));
    };


    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void  => {
        this.setState({ inputValue: event.target.value });
    };

    handleTodoSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        if (this.state.inputValue.trim() !== '') {
            const newTodo: TodoItem = {
                id: String(Date.now()),
                content: this.state.inputValue,
                status: 'todo',
            };

            this.setState((prevState) => ({
                todo: [...prevState.todo, newTodo],
                inputValue: '',
            }));
        }
    };

    handleDelete = (id: string): void => {
        this.setState((prevState) => ({
            todo: prevState.todo.filter((item) => item.id !== id),
            doing: prevState.doing.filter((item) => item.id !== id),
            done: prevState.done.filter((item) => item.id !== id),
        }));
    };

    toggleSection = (section: 'todo' | 'doing' | 'done') => {
        this.setState((prevState) => ({
            ...prevState,
            [`${section}IsCollapsed`]: !prevState[`${section}IsCollapsed`],
            // 아래 두 줄을 추가하여 다른 섹션의 상태를 유지하지 않도록 합니다.
            ...(section !== 'todo' && { todoIsCollapsed: prevState.todoIsCollapsed }),
            ...(section !== 'doing' && { doingIsCollapsed: prevState.doingIsCollapsed }),
            ...(section !== 'done' && { doneIsCollapsed: prevState.doneIsCollapsed }),
        }));
    };


    render() {
        return (
            <Box>
                <div>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {/* Todo Section */}
                            <Droppable droppableId="todo" direction="vertical">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        style={TodoStyle}
                                    >
                                        <h2 style={{marginTop:'0%'}}>
                                            Todo list
                                           {/* <img
                                                src={this.state.todoIsCollapsed ? require("../../../images/button/folded.png") : require("../../../images/button/unfolded.png")}
                                                alt={this.state.todoIsCollapsed ? "Fold" : "Unfold"}
                                                onClick={() => this.toggleSection('todo')}
                                                style={{ width: '24px', height: '24px' }}
                                            />*/}
                                        </h2>
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

                            {/* Doing Section */}
                            {/*<Droppable droppableId="doing" direction="vertical">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        style={TodoStyle}
                                    >
                                        <h2 style={{marginTop:'0%'}}>
                                            진행 중
                                            <img
                                                src={this.state.doingIsCollapsed ? require("../../../images/button/folded.png") : require("../../../images/button/unfolded.png")}
                                                alt={this.state.doingIsCollapsed ? "Fold" : "Unfold"}
                                                onClick={() => this.toggleSection('doing')}
                                                style={{ width: '24px', height: '24px' }} // 원하는 크기로 조절
                                            />
                                        </h2>
                                        {this.state.doing.map((item, index) => (
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
                            </Droppable>*/}

                            {/* Done Section */}
                            <Droppable droppableId="done" direction="vertical">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        style={TodoStyle}
                                    >
                                        <h2 style={{marginTop:'0%'}}>
                                            완료
{/*                                            <img
                                                src={this.state.doneIsCollapsed ? require("../../../images/button/folded.png") : require("../../../images/button/unfolded.png")}
                                                alt={this.state.doneIsCollapsed ? "Fold" : "Unfold"}
                                                onClick={() => this.toggleSection('done')}
                                                style={{ width: '24px', height: '24px' }} // 원하는 크기로 조절
                                            />*/}
                                        </h2>
                                        {this.state.done.map((item, index) => (
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
                        </div>
                    </DragDropContext>
                    <form onSubmit={this.handleTodoSubmit} style={{display:'flex'}}>
                        <input
                            type="text"
                            style={Todoinput}
                            value={this.state.inputValue}
                            onChange={this.handleInputChange}
                            placeholder="할 일을 입력하세요"
                        />
                        <button className="learn-more"  style={{width:'5px', height:'5px', marginLeft:'5px'}} type="submit">+</button>
                    </form>
                </div>
            </Box>
        );
    }
}

export default TodoList;