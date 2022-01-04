import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = 'http://localhost:8080/user'
  constructor(private http: HttpClient) { }
  getAllUser() {
    return this.http.get(this.url);
  }
  getUser(id: any) {
    return this.http.get(this.url + '/' + id)
  }
  addUser(data: any) {
    return this.http.post(this.url + '/signup', data)
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
