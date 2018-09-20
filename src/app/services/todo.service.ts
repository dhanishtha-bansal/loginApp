import { Injectable } from '@angular/core';
import { ToDo } from '../models/todo.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  autoIncId: number = 0;
  todoList: ToDo[] = [];
  user: any;

  addTodo(todo: ToDo) {
    if (!todo.id) {
      todo.id = this.autoIncId++ ;
    }
    this.todoList.push(todo);
    this.saveToDos();
    return this;
  }

  deleteTodoById(id: number) {
    this.todoList = this.todoList.filter(todo => todo.id !== id);
    this.saveToDos();
    return this;
  }

  getAllTodos() {
    return this.todoList;
  }

  toggleTodoComplete(todo){
    let complete = !todo.complete;
    let updatedTodo = this.updateTodoById(todo.id, complete);
    this.saveToDos();
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

  saveToDos() {
    this.user.on("child_added", 
      (snapshot) => {
        if(snapshot.hasChild("todoList")) {
         
          snapshot.ref.child("todoList").set(this.todoList);
        }
        else {
          snapshot.ref.child("todoList").push(this.todoList);
          snapshot.ref.child("todoList").set(this.todoList);
        }
    });
  }

  initializeList() {
    let userId = firebase.auth().currentUser.uid;
      console.log(`User Id : ${userId}`);
      this.user = firebase.database().ref(`users/`).orderByChild('userID').equalTo(userId);
      this.user.on("child_added", 
        (snapshot) => {
          var user = snapshot.val();
          if(user.todoList !== undefined)
          {
            console.log(typeof user.todoList);
            this.todoList = user.todoList;
            // var key = Object.keys(user.todoList);
            // console.log(key);
            // console.log(key[0]);
            // this.todoList = user.todoList[key[0]];
          }
          else {
            this.todoList = [];
          }      
      });
  }
}
