import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToDoService } from '../services/todo.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AppGlobals } from '../global/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  constructor(
    formBuilder: FormBuilder,
    private todoService: ToDoService,
    private userService: UserService,
    private router: Router
  ) 
  { 
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
        password: ['', Validators.required]
    });
    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
  }

  ngOnInit() {
    this.userService.logout();
  }  

  onSubmit(value) {   
    if(this.loginForm.status !== 'INVALID'){
      this.userService.login(value.email, value.password);
    }
  }
}
