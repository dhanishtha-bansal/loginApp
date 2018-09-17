import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup;
  firstname: AbstractControl;
  lastname: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;

  submitted = false;

  constructor(
    formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
      this.regForm = formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
      this.firstname = this.regForm.controls['firstname'];
      this.lastname = this.regForm.controls['lastname'];
      this.email = this.regForm.controls['email'];
      this.password = this.regForm.controls['password'];
  }

  onSubmit(value){
    this.submitted = true;
    console.log(value);
    console.log(this.regForm.status);
    if(this.regForm.status !== 'INVALID'){
      this.userService.registerUser(value);
    }    
  }
  ngOnInit() {
    this.userService.logout();
  }

}
