// user-details.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { USERS } from '../users-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{

  user: any | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    this.user = USERS.find(user => user.id === userId);
  }
}
