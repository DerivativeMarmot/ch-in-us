import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Origin',
      'Access-Control-Allow-Origin': '*',
    })
  };

  // private postListUrl = 'https://cors-anywhere.marmot.ink/https://www.chineseinla.com/f/page_viewforum/f_29/topicdays_1/start_30.html';
  // private url = 'https://cors-anywhere.marmot.ink/https://www.chineseinla.com/f/page_viewforum/f_29/start_15.html';
  // private url = 'https://worldtimeapi.org/api/timezone/Europe/London';

  constructor(
    private http: HttpClient
  ) { }

  getPostListHtml(index: string): Observable<string> {
    let postListUrl = `https://cors-anywhere.marmot.ink/https://www.chineseinla.com/f/page_viewforum/f_29/start_${index}.html`;
    return this.http.get(postListUrl, { responseType: 'text' });
  }

  
}
