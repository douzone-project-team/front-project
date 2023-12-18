import React, {Component} from "react";
import {initialRegiTodoState, initialTodo} from "../../state/mainStateManagement";
import TodoAction from "./todo-action";
import {TodoData, TodoState} from "../../object/Main/todo-object";
import TodoList from "../../components/CurrentSituation/Todo/Todolist";
import todolist from "../../components/CurrentSituation/Todo/Todolist";

const todoAction = new TodoAction();

export type Props = {
    children?: React.ReactNode;
};

export const TodoContext = React.createContext<TodoState>({
    todolist: initialTodo,
    regiTodoData:initialRegiTodoState,
    getTodoList():void{},
    regiTodo(content:string):void{}
});

export class TodoContextProvider extends Component<Props, TodoState> {
    state: TodoState = {
        todolist:initialTodo,
        regiTodoData:initialRegiTodoState,

        regiTodo:(content:string) =>{
            const regiTodoData = {
                content: content,
            };
            todoAction.regiTodo(regiTodoData)
                .then(result =>{
                    alert('등록완');
                })
            },
        getTodoList:() =>{
            todoAction.getTodolist((setTodolist) =>this.setState({...this.state, todolist:setTodolist}) )
        },
    }
    regiTodo=(content : string) =>{
        const regiTodoData = {
            content: content,
        };
        todoAction.regiTodo(regiTodoData)
            .then(result =>{
                alert('등록완');
            })
    };
    getTodoList = () => {
        todoAction.getTodolist((setTodolist) =>this.setState({...this.state,todolist:setTodolist}) )

    };

    render() {
        return (
            <TodoContext.Provider value={this.state}>
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}