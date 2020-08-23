import { Injectable} from '@nestjs/common';
import { Todo } from '../../models/todo';

@Injectable()
export class TodoService {

    private dbTodos: Todo[];
    getTodos(): Todo[] {
        //retrieve todos from storage, local or 
        //external and return it
        let t1 = new Todo(1, "First todo", new Date());
        let t2 = new Todo(2, "2nd Todo");
        return [t1, t2];
    }
    
    create(todoText: string) {
        //ideally we would have some complex db interaction process
        let id = this.getId();
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
    private getId():number {
        let maxTodo = this.dbTodos.reduce((pValue,cValue) => cValue.id > pValue.id ? cValue:pValue, this.dbTodos[0]);
        return maxTodo.id;
    }
}