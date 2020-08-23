import { Injectable} from '@nestjs/common';
import { Todo } from '../../models/todo';

@Injectable()
export class TodoService {

    private dbTodos: Todo[] = [];
    constructor() {
        let t1 = new Todo(1, "First todo", new Date());
        let t2 = new Todo(2, "2nd Todo");
        
        this.dbTodos = [t1, t2];
    }
    getTodos(): Todo[] {
        //retrieve todos from storage, local or 
        //external and return it
        return this.dbTodos;
    }
    
    create(todoText: string) {
        debugger
        //ideally we would have some complex db interaction process
        console.log(this.getMostRecentId());
        let id = this.getMostRecentId() + 1;
        console.log(id);
        let todo = new Todo(id, todoText, new Date());
        this.dbTodos.push(todo);
    }
    
    findTodo(todoId: number): Todo {
        const result = this.dbTodos.find(todo => todo.id === todoId);
        return result;
    }
    /* Delete the todo with id, modifying the old list and return the
    new list. Do we have a lock on this resource? */
    deleteTodo(todoId: number): Todo[] {
        let index = this.dbTodos.findIndex(todo => todo.id === todoId);
        this.dbTodos.splice(index, 1); 
        return this.dbTodos;
    }
    updateTodo(todo: Todo): Todo[] {
        let index = this.dbTodos.findIndex(todo => todo.id === todo.id);
        this.dbTodos[index] = todo; //a simple replacement of the array elem
        return this.dbTodos;
    }
    /* a utility function to get the latest id */
    private getMostRecentId():number {
        let maxTodo = this.dbTodos.reduce((pValue,cValue) => cValue.id > pValue.id ? cValue:pValue, this.dbTodos[0]);
        return maxTodo.id;
    }
}