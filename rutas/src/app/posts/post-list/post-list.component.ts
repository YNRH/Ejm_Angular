
import { Component } from '@angular/core';
import { POSTS } from '../posts-data';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {

  posts = POSTS;

  selectedPostId: number | null = null;

  showDetails(postId: number): void{
    this.selectedPostId = postId;
  }
}
