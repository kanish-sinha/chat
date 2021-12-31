import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public loginService:UsersService,private router:Router) { }

  ngOnInit(): void {
  }
  chat() {
    if (this.loginService.loggedIn()) {
      this.router.navigate(['/signup'])
    }
    else{
      this.router.navigate(['/login'])
    }
  }
  removetoken() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
}
