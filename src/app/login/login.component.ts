import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

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
    private Auth: AuthService,
    private userService: UserService,
    private router: Router
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

  onSubmit(value) {   

    if(this.loginForm.status !== 'INVALID'){
      this.userService.login(value)
      .subscribe(
        data => {
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
        }
      );
    }
    //console.log(value);
  }
}
