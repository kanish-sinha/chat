import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import * as io from 'socket.io-client'
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../services/message.service';
@Component({
  selector: 'app-chat-personal',
  templateUrl: './chat-personal.component.html',
  styleUrls: ['./chat-personal.component.css']
})
export class ChatPersonalComponent implements OnInit {
  users: any; sender: any;
  reciever: any; recieverName: any; Name: any
  url = 'http://localhost:8080';
  allmessage: any;
  socket: any; arr: any;
  count = 0;
  constructor(private service: UsersService, private route: ActivatedRoute,
    private messageService: MessageService, private router: Router) {
    this.service.getAllUser().subscribe(response => {
      this.users = response;
    })
  }
  ngOnInit(): void {
    this.service.getAllUser().subscribe(response => {
      this.users = response;
    })
    this.sender = this.route.snapshot.paramMap.get('sender');
    this.reciever = this.route.snapshot.paramMap.get('reciever');
    this.messageService.getAllMsg(this.sender, this.reciever).subscribe(response => {
      this.f1(response);
    })
    this.service.getUser(this.reciever).subscribe(response => {
      this.username(response);
    })
    this.socket = io.connect(this.url)
    this.socket.emit('new-user-joined', this.sender)
    this.socket.on('user-joined', (data: any) => {
      for (let i = 0; i < this.users.length; i++) {
        if (data === this.users[i].username) {
          this.users[i].status = true
        }
      }
    })
    this.socket.on('recieve', (data: any) => {
      let div = document.getElementById('box')
      const msgelement = document.createElement('div');
      msgelement.className = 'chat-message-left pb-4 flex-shrink-1 rounded py-2 px-3 mr-3'
      msgelement.style.display = 'flex';
      msgelement.style.marginRight = 'auto';
      msgelement.style.flexShrink = '0'
      msgelement.style.marginBottom = '2%'
      msgelement.style.backgroundColor = 'blanchedalmond'
      msgelement.textContent = data.message
      div?.appendChild(msgelement);
    })
  }
  f1(res: any) {
    this.arr = res;
  }
  username(res: any) {
    this.recieverName = res;
    this.Name = this.recieverName[0].username
  }
  send(msg: any) {
    let div = document.getElementById('box')
    let message = msg.value
    msg.value = "";
    let msgelement = document.createElement('div');
    msgelement.className = 'flex-shrink-1 rounded py-2 px-3 mr-3'
    msgelement.style.display = 'flex';
    msgelement.style.flexDirection = 'row-reverse'
    msgelement.style.marginLeft = 'auto';
    msgelement.style.flexShrink = '0'
    msgelement.style.marginBottom = '2%';
    msgelement.style.backgroundColor = 'cadetblue'
    msgelement.textContent = message
    div?.appendChild(msgelement);
    this.socket.emit('send', { message: message, sender: this.sender, reciever: this.reciever })
  }
  user(item: any) {
    this.router.navigate(['chat', this.sender, item._id])
      .then(() => {
        window.location.reload();
      });
  }
}