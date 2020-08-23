import { Controller, Get, Post, Put, Param, Delete, Patch, Body } from '@nestjs/common';
import { TodoService } from 'src/services/todo/todo.service';
import { Todo } from '../models/todo';

@Controller('todo')
export class TodoController {

    constructor(private todoService: TodoService) {}

    @Get("/")
    getTodos(): Todo[] {
        return this.todoService.getTodos();
    }
    
    /* Accept a parameter to create a todo */
    @Post("/create")
    async createTodo(@Body('text') text: string) {
        this.todoService.create(text);
    }

    @Patch(':id')
    async updateTodo(@Param('id') todoId: number,
                    @Body('text') todoText: string) {

        let todo = this.todoService.findTodo(todoId);
        todo.text = todoText;
        this.todoService.updateTodo(todo);
        //at the end of all methods refresh todo on screen
        //with the latest from DB values
    }
    
    @Get(':id')
    getTodoById(@Param('id') todoId: number): Todo {
        return this.todoService.findTodo(todoId);
    }
    
    @Delete(':id')
    deleteTodoById(@Param('id') todoId: number) {
        this.todoService.deleteTodo(todoId);
    }

}
