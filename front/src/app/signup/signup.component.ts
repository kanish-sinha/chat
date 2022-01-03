import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form = new FormGroup({
    'username': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'newpassword': new FormControl('', [Validators.required]),
    'confirmpassword': new FormControl('', [Validators.required])

  })
  constructor() { }

  ngOnInit(): void {
  }
  get username() {
    return this.form.get('username');
  }
  get email() {
    return this.form.get('email');
  }
  get newpassword() {
    return this.form.get('newpassword')
  }
  get confirmpassword() {
    return this.form.get('confirmpassword')
  }
  register(val: any) {
    console.log(val.value)
  }
}
