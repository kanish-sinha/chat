import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client'
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  socket: any; currentuser: any;
  users: any
  url = "http://localhost:8080"
  constructor(private userservice: UsersService, private route: ActivatedRoute, private router: Router) {
    this.socket = io.connect(this.url)
  }
  ngOnInit(): void {
    this.userservice.getAllUser().subscribe(response => {
      this.users = response
    })
    this.currentuser=this.route.snapshot.paramMap.get('sender')
  }
  chat(user: any) {
    this.router.navigate(['chat', this.currentuser, user._id])
  }
}