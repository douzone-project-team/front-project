
export type TodoData = {
    todoNo: number;
    content:string;
    checked:boolean;
}

export type TodoList = {
    todoListData: TodoData[];
}


export type RegiTodoData = {
    content : string
}


export type TodoState = {
    todolist: TodoList;
    regiTodoData:RegiTodoData;
    getTodoList:()=>void;
    regiTodo:(content:string)=>void;
};
