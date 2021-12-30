import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client'
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  socket: any
  url = "http://localhost:8080"
  constructor() {
    this.socket = io.connect(this.url)
  }
  ngOnInit(): void {
    let div = document.getElementById('chat-box')
    const msgcontainer = document.querySelector('.container');
    let names = prompt('enter name');
    this.socket.emit('new-user-joined', names)
  }
  f1() {

  }
  send(val: any) {
    let div = document.getElementById('box')
    let message = val.value
    val.value = "";
    let msgelement = document.createElement('div');
    msgelement.className = 'message right'
    msgelement.style.float = 'right';
    msgelement.style.clear = 'both'
    msgelement.textContent = message
    div?.appendChild(msgelement);
    this.socket.emit('send', message)
    this.socket.on('recieve', (data: any) => {
      const msgelement = document.createElement('div');
      msgelement.className = 'message left'
      msgelement.style.float = 'left'
      msgelement.style.clear = 'both'
      msgelement.textContent = data.message
      div?.appendChild(msgelement);
    })
  }
}