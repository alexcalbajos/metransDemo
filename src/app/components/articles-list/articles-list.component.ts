import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';

import { Article } from '../../models/article.model';
import { ArticlesService } from '../../services/articles.service';

@UntilDestroy()
@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
  allArticles: Article[];
  articlesDataSource: MatTableDataSource<Article>;
  displayedColumns = ['title', 'author', 'created-at', 'comments'];
  filterControl = new FormControl();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.articlesService.getAll().subscribe(articles => {
      this.allArticles = articles;

      this.articlesDataSource = new MatTableDataSource(this.allArticles);
      this.articlesDataSource.paginator = this.paginator;
      this.articlesDataSource.sort = this.sort;
      this.setUpFilter();
    });
  }

  setUpFilter(): void {
    this.filterControl.valueChanges
      .pipe(untilDestroyed(this), debounceTime(400), distinctUntilChanged())
      .subscribe(value => this.filterArticles(value));
  }

  filterArticles(value: string): void {
    this.articlesDataSource.data = this.allArticles.filter(a => a.title.trim().toLowerCase().includes(value.trim().toLowerCase()));
  }

  editArticle(article: Article): void {
    console.log(article);
  }
}
