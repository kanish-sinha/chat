import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  userName = '';
  message = ' ';
  messageList: { message: string, userName: string, mine: boolean }[] = [];
  userList: string[] = [];
  socket: any;

  constructor() { }
  ngOnInit(): void {

  }
  setUserName(): void {
    this.userNameUpdate(this.userName);
  }
  userNameUpdate(name: string): void {
    this.socket = io.io(`https://chat-competent-programming.herokuapp.com/?userName=${name}`);
    this.userName = name;

    this.socket.emit('set-user-name', name);

    this.socket.on('user-list', (userList: string[]) => {
      this.userList = userList;
    });

    this.socket.on('message-broadcast', (data: { message: string, userName: string }) => {
      if (data) {
        this.messageList.push({ message: data.message, userName: data.userName, mine: false });
      }
    });
  }

  sendMessage(): void {
    this.socket.emit('message', this.message);
    this.messageList.push({ message: this.message, userName: this.userName, mine: true });
    this.message = '';
  }

}
