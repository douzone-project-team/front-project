import Fetcher from "../fetch-action";
import {
    TodoState, RegiTodoData, TodoData, TodoList,
} from "../../object/Main/todo-object";
import {} from "../../object/Main/todo-object";
import {Employee} from "../../object/Main/main-object";

const fetcher = new Fetcher();

class TodoAction {
    private baseUrl : string = '/todo';


    public regiTodo(object : RegiTodoData){
        console.log(object)
        return fetcher.POST(this.baseUrl, object);
    }
    public getTodolist(setTodolist: (todolist:TodoList ) => void) {
        const URL = `${this.baseUrl}`;
/*        const res = await fetcher.GET(URL);
        if (res?.data) {
            setTodo(res.data as Todo)
        }*/
        return fetcher.GET(URL)
            .then((res) => {
                if (res) {
                    const {data} = res
                    setTodolist(data as TodoList)
                    console.log('액션',data);
                }
            });

    }

  /*  public async getTodolist() {
        const URL = `${this.baseUrl}`;
        try {
            const data = await fetcher.GET(URL);
            console.log('투두',data);
            return data;
        } catch (error) {
            console.error("Error fetching todolist:", error);
            throw error;
        }
    }*/


}
export default TodoAction;
