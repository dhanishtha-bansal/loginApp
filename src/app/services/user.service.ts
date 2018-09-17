import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../global/global';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, 
              private config: AppGlobals,
              private router: Router) { }

  token: string;
  
  registerUser(user: User){
    user.todoList = [];
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then((response) => {
      console.log(response.user.uid);
      user.userID = response.user.uid;
      this.http.post<any>("https://todoapp-f64ba.firebaseio.com/users.json", user).subscribe(
        () => {
          console.log("Registration successful!!");
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error.message);
        }
      )
    });
  }

  login(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((response) => {
      console.log(response);
      this.router.navigate(['/home']);
    })   
    .catch( error => console.log(error));
  }

  getToken() {
      firebase.auth().currentUser.getIdToken()
      .then( (token: string) => this.token = token )

      
  }
  logout() {
    localStorage.removeItem('currentUser');
  }
}
