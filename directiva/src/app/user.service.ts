import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: string[] = [];

  addUser(username: string) {
    this.users.push(username);
  }

  getUsers() {
    return this.users;
  }
}
