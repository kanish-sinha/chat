import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  url = 'http://localhost:8080'
  message: any
  constructor(private http: HttpClient) { }
  getAllMsg(id: any, id2: any) {
    return this.http.get(this.url + '/message/' + id + '/' + id2);
  }
}
