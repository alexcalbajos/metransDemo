import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';

import { Article } from '../../../models/article.model';
import { ArticlesService } from '../../../services/articles.service';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';

@UntilDestroy()
@Component({
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
  allArticles: Article[];
  articlesDataSource: MatTableDataSource<Article>;
  displayedColumns = ['title', 'author', 'created-at', 'comments', 'actions'];
  filterControl = new FormControl({ value: '', disabled: true });

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private articlesService: ArticlesService,
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private router: Router) { }

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
    this.filterControl.enable();
    this.filterControl.valueChanges
      .pipe(untilDestroyed(this), debounceTime(400), distinctUntilChanged())
      .subscribe(value => this.filterArticles(value));
  }

  filterArticles(value: string): void {
    this.articlesDataSource.data = this.allArticles.filter(a => a.title.trim().toLowerCase().includes(value.trim().toLowerCase()));
  }

  goToArticleDetails(article?: Article): void {
    this.router.navigate(['./', article ? article.id : 'add'], { relativeTo: this.activatedRoute });
  }

  removeArticle(article: Article): void {
    article.deleteLoading = true;
    this.matDialog.open(DeleteConfirmationComponent, { data: article }).afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.articlesService.delete(article.id).subscribe(
          () => {
            this.matSnackBar.open('Article deleted successfully');
            this.allArticles = this.allArticles.filter(a => a.id !== article.id);
            this.articlesDataSource.data = this.allArticles;
          },
          () => {
            this.matSnackBar.open('Something went wrong');
            article.deleteLoading = false;
          });
      } else {
        article.deleteLoading = false;
      }
    })
  }
}
