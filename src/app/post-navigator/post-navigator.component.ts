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

  isLoading: boolean = false;
  // @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  // init paginator
  length: number = 0;
  pageIndex: number = 0;
  pageSize: number = 0; 
  // pageSizeOptions: number[] = [10, 20, 30, 40];
  pageEvent?: PageEvent;


  constructor(
    private forumService: ForumService,
  ) {
  }

  onSelect(post: Post): void {
    this.selectedPost = post;
    this.postSelected.emit(post); // acts as an event that invokes parent methods.
  }

  onPageChanged(pageIndex: number) {
    // this.pageIndex = pageIndex;
    console.log(pageIndex);
    this.getPosts(pageIndex);
    
    // this.updateGoto();
    // this.emitPageEvent(pageEvt);
    
  }

  getPosts(index: number) {
    this.isLoading = true;
    this.posts = [];
    this.forumService.getPostListHtml(String(index * 15)).subscribe(
      data => {

        const domParser = new DOMParser();
        const document = domParser.parseFromString(data, 'text/html');

        // fetch total page
        const post_pagination = document.querySelectorAll('.pagination_right > .page_index_link')
        const total_pages = post_pagination[post_pagination.length - 1];
        
        // init post list
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

        // init paginator
        // this.slicedPosts = this.posts.slice(0, this.pageSize);
        // this.pageSize = this.posts.length;
        this.length = Number(total_pages.textContent);
        // console.log('from nav ', this.length);
        this.onSelect(this.posts[0]);

        this.isLoading = false;
      }
    );
  }

  // OnPageChange(event: PageEvent) {
  //   // let startIndex = event.pageIndex * event.pageSize;
  //   let startIndex = 0;
  //   let endIndex = startIndex + this.pageSize;
  //   if (endIndex > this.length) {
  //     endIndex = this.length;
  //   }
  //   this.getPosts(event.pageIndex);
  //   // this.slicedPosts = this.posts.slice(startIndex, endIndex);
  //   this.onSelect(this.posts[0]);
  // }

  ngOnInit(): void {

    this.getPosts(0);

  }
}
