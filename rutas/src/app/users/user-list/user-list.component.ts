// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { USERS } from '../users-data';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent{

  users = USERS;

  selectedUserId: number | null = null;

  showDetails(userId: number): void{
    this.selectedUserId = userId;
  }
}
