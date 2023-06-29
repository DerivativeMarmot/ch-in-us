import { Post } from '../post';
import { ForumService } from '@/forum.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-navigator',
  templateUrl: './post-navigator.component.html',
  styleUrls: ['./post-navigator.component.css']
})
export class PostNavigatorComponent {

  @Output() postSelected = new EventEmitter<Post>();
  posts: Post[] = [];
  slicedPosts: Post[] = [];
  selectedPost?: Post;

  isLoading: boolean = true;
  // @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  // init paginator
  length: number = 0;
  pageSize: number = 10;  //displaying three cards each row
  pageSizeOptions: number[] = [10, 20, 30, 40];
  pageEvent?: PageEvent;


  constructor(
    private forumService: ForumService,
  ) {
  }

  onSelect(post: Post): void {
    this.selectedPost = post;
    this.postSelected.emit(post); // acts as an event that invokes parent methods.
  }

  getPosts() {
    this.forumService.getPostListHtml().subscribe(
      data => {
        const domParser = new DOMParser();
        const document = domParser.parseFromString(data, 'text/html');

        const post_list = document.querySelector('#pageCenter > div.forum_left > form')
          ?.getElementsByClassName('forum_line')[2]
          .querySelectorAll(':scope > .topic_list_detail'); // :scope means only the direct children

        post_list?.forEach(post => {
          if (post != null) {
            const author = post.querySelector('.topic_list_2 .author');
            const time = post.querySelector('.topic_list_2 .time');
            const reply_count = post.querySelector('.topic_list_3 .reply_count');
            const read_count = post.querySelector('.topic_list_3 .read_count');
            const title = post.querySelector('.topic_list_12 .title');
            if (title != null) {
              this.posts.push({
                title: title.textContent || '',
                post_link: 'https://cors-anywhere.marmot.ink/https://www.chineseinla.com/'
                  + title.getAttribute('href'),
                author: author?.textContent || '',
                author_link: 'https://cors-anywhere.marmot.ink/https://www.chineseinla.com/'
                  + author?.querySelector('a')?.getAttribute('href'),
                upload_time: time?.textContent || '',
                reply_count: Number(reply_count?.textContent),
                read_count: Number(read_count?.textContent)
              });
            }
          }
        });
        this.slicedPosts = this.posts.slice(0, this.pageSize);
        // this.selectedPost = ;
        this.length = this.posts.length;
        this.onSelect(this.slicedPosts[0]);

        this.isLoading = false;
      }
    );
  }

  OnPageChange(event: PageEvent) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.length) {
      endIndex = this.length;
    }
    this.slicedPosts = this.posts.slice(startIndex, endIndex);
    this.onSelect(this.slicedPosts[0])
  }

  ngOnInit(): void {

    this.getPosts();

  }
}
