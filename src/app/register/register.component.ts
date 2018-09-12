import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup;
  firstname: AbstractControl;
  lastname: AbstractControl;
  username: AbstractControl;
  password: AbstractControl;

  submitted = false;

  constructor(
    formBuilder: FormBuilder
  ) {
      this.regForm = formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
      this.firstname = this.regForm.controls['firstname'];
      this.lastname = this.regForm.controls['lastname'];
      this.username = this.regForm.controls['username'];
      this.password = this.regForm.controls['password'];
  }

  onSubmit(value: string){
    this.submitted = true;
    console.log(value);
    console.log(this.regForm.status);
    console.log(this.regForm.errors);
    
  }
  ngOnInit() {
  }

}
