import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users: any; res: any;
  form = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required])
  })
  constructor(private service: UsersService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.getAllUser().subscribe(response => this.users = response);
  }
  get email() {
    return this.form.get('email')
  }
  get password() {
    return this.form.get('password');
  }
  loginUser(user: any) {
    // this.service.loginUser(user).subscribe(response => {
    //   this.res = response;
    localStorage.setItem('token', user._id);
    //this.router.navigate([''])
    //})
  }
  submit(form: any) {
    let data = form.value; let count = 0;
    console.log(form.value);
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].email === data.email) {
        if (this.users[i].password === data.password) {
          this.loginUser(data)
          this.router.navigate(['chat', this.users[i]._id])
        }
        else
          this.form.setErrors({ invalid: true })
      }
    }
    if (i >= this.users.length) {
      this.form.setErrors({ invalid: true });
    }
  }
}
