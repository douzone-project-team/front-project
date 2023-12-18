import React, {Component} from 'react';
import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';
import TodoBox from './TodoBox';
import {Box} from '@material-ui/core';
import {TodoData, TodoState} from "../../../object/Main/todo-object";
import {TodoContext} from "../../../store/Todo/todo-context";
import {MainState} from "../../../object/Main/main-object";
import Fetcher from "../../../store/fetch-action";

const fetcher = new Fetcher();

interface TodoListState {
    TodoItem:TodoItem[];
    todo: TodoItem[];
    done: TodoItem[];
    inputValue: string;
    isInputOpen: boolean;
}
interface TodoItemList{
    todoItemList : TodoItem[];
}
interface TodoItem {
    todoNo: number;
    content:string;
    checked:boolean;
}

const TodoStyle = {
    width: '100%',
    maxWidth: '100%',
    height: '138px',
    maxHeight: '138px',
    marginBottom: '1%',
    marginTop: '2%',
    marginRight: '2%',
    flexGrow: 1,
    padding: '2%',
    borderRadius: '8px',
    overflow: 'auto',
    backgroundColor: '#F3F3F3',
    ...{
        '&::-webkit-scrollbar': {
            width: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
            height: '30%',
            background: '#217af4',
            borderRadius: '10px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'rgba(33, 122, 244, .1)',
        },
    },
};  // <-- replace the comma with a semicolon

const Todoinput = {
    width: '100%',
    height: '100%',
    borderRadius: '20px',
    border: 0,
    boxShadow: '0 1px 7px rgba(0, 0, 0, 0.15)',
    paddingLeft: '5%',
    marginLeft: '5%',
    marginTop: '-5%'
};

const addTodoButtonImage = require('../../../images/button/add-todo-button.png');


class TodoList extends Component<{}, TodoListState> {
    static contextType = TodoContext;
    state: TodoListState = {
        TodoItem: [],
        todo: [],
        done:[],
        inputValue: '',
        isInputOpen: false,
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

        const updatedItems: TodoItem[] = [...(this.state[sourceId] as TodoItem[])];
        const [reorderedItem] = updatedItems.splice(source.index, 1);

        // Update checked property based on destination
        reorderedItem.checked = destinationId === 'done';

        // Update state
        this.setState((prevState) => ({
            ...prevState,
            [sourceId]: updatedItems,
            [destinationId]: [...(prevState[destinationId] as TodoItem[]) || [], reorderedItem],
        }));

        // Update backend based on the checked property
        const updateUrl = `/todo/${reorderedItem.todoNo}`;
        const updateData = { todoNo:reorderedItem.todoNo, content:reorderedItem.content, checked:reorderedItem.checked};

        fetcher.PUT(updateUrl, updateData)
            .then((res) => {
                if (res) {
                    console.log(`Todo with todoNo ${reorderedItem.todoNo} updated successfully.`);
                    this.loadData();
                } else {
                    console.error(`Failed to update Todo with todoNo ${reorderedItem.todoNo}.`);
                }
            })
            .catch((error) => {
                console.error(`Error while updating Todo with todoNo ${reorderedItem.todoNo}:`, error);
            });
    };



    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({inputValue: event.target.value});
    };

    handleTodoSubmit = (): void => {
        const state = this.context as TodoState;
        const { inputValue } = this.state;

        if (inputValue.trim() !== '') {
            const newTodo = {
                id: String(Date.now()),
                content: inputValue,
                status: 'todo',
            };
            state.regiTodo(inputValue);

            // 인풋 값 초기화 및 인풋 창 닫기
            this.setState({
                inputValue: '',
                isInputOpen: false,
            });
            this.loadData();
        }
    };
    handleDelete = (todoNo: number): void => {
        const state = this.context as TodoState;

        // 서버에 삭제 요청을 보낼 때 사용할 URL 경로
        const deleteUrl = `/todo/${todoNo}`;

        // 서버에 DELETE 요청을 보냄
        fetcher.DELETE(deleteUrl)
            .then((res) => {
                if (res) {
                    this.loadData();
                    console.log(`Todo with todoNo ${todoNo} deleted successfully.`);
                } else {
                    console.error(`Failed to delete Todo with todoNo ${todoNo}.`);
                }
            })
            .catch((error) => {
                console.error(`Error while deleting Todo with todoNo ${todoNo}:`, error);
            });
    };


    toggleInput = (): void => {
        this.setState((prevState) => ({
            ...prevState,
            isInputOpen: !prevState.isInputOpen,
        }));
    };
    loadData=()=>{
        fetcher.GET(`/todo`)
            .then((res) => {
                if (res) {
                    const { data } = res;

                    // TodoItem을 배열로 업데이트
                    this.setState({ TodoItem: Array.isArray(data) ? data : [] });

                    console.log('액션1', data);
                    console.log('액션2', this.state.TodoItem);
                }
            });
    }
    componentDidMount() {
        console.log(123);
        this.loadData();
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<TodoListState>, snapshot?: any) {
        console.log('업데이트');
        const todo = [];
        const done = [];
        if (prevState.TodoItem !== this.state.TodoItem) {
            const todoItemList = this.state.TodoItem;
            
            const todo = todoItemList
                .filter((item) => !item.checked)
                .map((item) => ({
                    todoNo: item.todoNo,
                    content: item.content,
                    checked: item.checked,
                })) as TodoItem[];

            const done = todoItemList
                .filter((item) => item.checked)
                .map((item) => ({
                    todoNo: item.todoNo,
                    content: item.content,
                    checked: item.checked,
                })) as TodoItem[];

            this.setState({
                todo: todo,
                done: done,
            });

            console.log('Processed Todo Data:', todo);
            console.log('Processed Done Data:', done);
        }
    }


    render() {
        const state = this.context as TodoState
        return (
            <Box>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div style={{display: 'flex'}}>
                        <Droppable droppableId="todo" direction="vertical">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={TodoStyle}
                                >
                                    <div style={{display: 'flex'}}>
                                        <h2 style={{marginTop: '0%', color: '#F595BA'}}>Todo list</h2>
                                        <form
                                            style={{display: 'flex'}}
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

                                                    <span
                                                        onClick={this.toggleInput}
                                                        style={{
                                                            marginLeft: '5px',
                                                            cursor: 'pointer',
                                                            color: 'red',
                                                            fontSize: '1.2em',
                                                        }}
                                                    >
                ❌
            </span>
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
                                    {this.state.TodoItem.map((item, index) => {
                                        if (!item || item.todoNo === undefined) {
                                        }

                                        return (
                                            <Draggable key={item.todoNo} draggableId={item.todoNo?.toString()} index={index}>
                                                {(provided, snapshot) => (
                                                    <TodoBox
                                                        id={item.todoNo}
                                                        content={item.content}
                                                        provided={provided}
                                                        snapshot={snapshot}
                                                        onDelete={() => this.handleDelete(item.todoNo)}
                                                    />
                                                )}
                                            </Draggable>
                                        );
                                    })}
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
                                    <h2 style={{marginTop: '0%', color: '#3A4CA8'}}>Finish</h2>
                                    {this.state.done?.map((item, index) => (
                                        <Draggable key={item.todoNo || index} draggableId={item.todoNo?.toString() || index.toString()} index={index}>
                                            {(provided, snapshot) => (
                                                <TodoBox
                                                    id={item.todoNo}
                                                    content={item.content}
                                                    provided={provided}
                                                    snapshot={snapshot}
                                                    onDelete={() => this.handleDelete(item.todoNo)}
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
