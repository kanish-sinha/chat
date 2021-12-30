import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any
  constructor() { }
  listen(event: any) {
    return new Observable((subscriber) => {
      this.socket.on(event, (data: any) => {
        subscriber.next(data);
      })
    })
  }
  emit(event: any, data: any) {
    this.socket.emit(event, data)
  }
}
