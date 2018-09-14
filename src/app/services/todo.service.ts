import { Injectable } from '@angular/core';
import { ToDo } from '../models/todo.model';


@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  autoIncId: number = 0;

  todoList: ToDo[] = [];
  constructor() { }

  addTodo(todo: ToDo) {
    if (!todo.id) {
      todo.id = this.autoIncId++ ;
    }
    this.todoList.push(todo);
    return this;
  }

  deleteTodoById(id: number) {
    this.todoList = this.todoList.filter(todo => todo.id !== id);
    return this;
  }

  getAllTodos() {
    return this.todoList;
  }

  toggleTodoComplete(todo){
    let complete = !todo.complete;
    let updatedTodo = this.updateTodoById(todo.id, complete);
    return updatedTodo;
  }

  updateTodoById(id: number, complete: boolean) {
    let todo = this.getTodoById(id);
    if (todo === null) {
      return null;
    }
    todo.complete = complete;
    return todo;
  }

  getTodoById(id: number) {
    return this.todoList.filter(todo => todo.id === id).pop();
  }
}
