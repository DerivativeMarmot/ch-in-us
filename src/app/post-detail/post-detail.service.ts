import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostDetailService {

  constructor(
    private http: HttpClient
  ) { }

  getPostDetailHtml(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'text' });
  }
}
