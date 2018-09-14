import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../services/todo.service';
import { ToDo } from '../models/todo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todo: ToDo = new ToDo();
  constructor(private todoService: ToDoService) { }

  ngOnInit() {
  }

  addTodo() {
    this.todoService.addTodo(this.todo);
    this.todo = new ToDo();
  }

  toggleTodoComplete(todo) {
    this.todoService.toggleTodoComplete(todo);
  }

  removeTodo(todo) {
    this.todoService.deleteTodoById(todo.id);
  }

  get todos() {
    return this.todoService.getAllTodos();
  }
}
