import { Post } from '../post-navigator/post';
import { Component } from '@angular/core';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent {

  selectedPost?: Post;

  onPostSelected(post: Post): void {
    this.selectedPost = post;
  }

}
