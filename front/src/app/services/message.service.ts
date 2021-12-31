import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  url = 'http://localhost:8080'
  message: any
  constructor(private http: HttpClient) { }
  getSenderMsg(id: any) {
    return this.http.get(this.url + '/sender/' + id)
  }
  getRecieverMsg(id: any) {
    return this.http.get(this.url + '/reciever/' + id)
  }
}
