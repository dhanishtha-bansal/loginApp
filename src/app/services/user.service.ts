import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../global/global';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, 
              private config: AppGlobals,
              private router: Router) { }

  registerUser(user: User){
    return this.http.post(`${this.config.baseAppUrl}/register`, user);
  }

  login(value: string) {
    return this.http.post<any>(`${this.config.baseAppUrl}/authenticate`, value)
        .subscribe(user => {
            if (user && user.token === 'JWT') {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.router.navigate(['/home']);
            }
        },
        error => {
          console.log(error.message);
        }
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
