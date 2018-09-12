import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username: AbstractControl;
  password: AbstractControl;

  constructor(
    formBuilder: FormBuilder,
    private Auth: AuthService
  ) 
  { 
    this.loginForm = formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
  }

  ngOnInit() {
  }

  

  onSubmit(value: string) {
    this.Auth.getUserDetails(value.username, value.password);
    console.log(value);
  }
}
