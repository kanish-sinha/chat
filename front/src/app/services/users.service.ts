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
  loggedIn(){
    return !!localStorage.getItem('token');
  }
}
