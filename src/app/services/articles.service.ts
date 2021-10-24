import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Article } from '../models/article.model';

const ARTICLES_ENDPOINT = 'https://6175960c03178d00173da944.mockapi.io/metransDemo/articles';

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(ARTICLES_ENDPOINT);
  }

  get(articleId: string): Observable<Article> {
    const url = `${ARTICLES_ENDPOINT}/${articleId}`;

    return this.httpClient.get<Article>(url);
  }

  add(article: Article): Observable<Article> {
    return this.httpClient.post<Article>(ARTICLES_ENDPOINT, article);
  }

  update(article: Article): Observable<Article> {
    const url = `${ARTICLES_ENDPOINT}/${article.id}`;

    return this.httpClient.put<Article>(url, article);
  }

  delete(articleId: string): Observable<any> {
    const url = `${ARTICLES_ENDPOINT}/${articleId}`;

    return this.httpClient.delete(url);
  }
}
