import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../global/global';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ToDo } from '../models/todo.model';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, 
              private errorService: ErrorService,
              private router: Router) { }

  token: string;

  registerUser(user: User) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then((response) => {
      console.log(response.user.uid);
      user.userID = response.user.uid;
      this.http.post<any>("https://todoapp-f64ba.firebaseio.com/users.json", user).subscribe(
        () => {
          alert("Registration successful!!");
          this.router.navigate(['/login']);
        },
        error => {
          this.errorService.error(error);
          console.log(error.message);
        }
      )
    })
    .catch( error => {
      this.errorService.error(error);
      console.log(error.message);
    });
  }

  login(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((response) => {
      console.log(response);
      firebase.auth().currentUser.getIdToken()
        .then(
          (token: string) => this.token = token
        )
      this.router.navigate(['/home']);
    })   
    .catch( error => {
      this.errorService.error(error);
      console.log(error)
    });
  }

  getToken() {
      firebase.auth().currentUser.getIdToken()
      .then( (token: string) => this.token = token )
      return this.token;    
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
