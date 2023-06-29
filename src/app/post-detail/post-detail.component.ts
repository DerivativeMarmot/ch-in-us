import { Component, Input, SimpleChanges } from '@angular/core';
import { PostDetailService } from '@/post-detail/post-detail.service';
import { Post } from '@/post';
import { PostDetail } from './post-detail';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent {

  @Input() post_link?: string;
  detailString: string = '';
  postDetail?: PostDetail;

  constructor(
    private postDetailSerivce: PostDetailService
  ) {
  }

  getPostDetail() {
    if (this.post_link) {
      this.postDetailSerivce.getPostDetailHtml(this.post_link || '').subscribe(
        data => {
          // console.log(data);
          const domParser = new DOMParser();
          const document = domParser.parseFromString(data, 'text/html');
          // this.detailString = data;

          const post_detail = document.querySelector('table .post_top');
          const title = post_detail?.querySelector('.post_title');
          const time = post_detail?.querySelector('.post_time');
          const body = post_detail?.querySelector('.post_body');

          this.postDetail = {
            title: title?.textContent || '',
            time: time?.textContent || '',
            body: body?.innerHTML || ''
          }
        }
      );
    }

  }

  ngOnInit(): void {

  }

  // https://stackoverflow.com/questions/38571812/how-to-detect-when-an-input-value-changes-in-angular
  ngOnChanges(changes: SimpleChanges): void { // called when @Input changes
    this.getPostDetail();
  }

}
