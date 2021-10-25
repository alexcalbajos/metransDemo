import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { Article } from '../../../models/article.model';
import { ArticlesService } from '../../../services/articles.service';

@Component({
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  existingArticle: Article;
  articleForm: FormGroup;
  submitLoading: boolean;

  constructor(private articlesService: ArticlesService,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const articleId = this.activatedRoute.snapshot.paramMap.get('id');
    if (articleId && articleId !== 'add') {
      this.articlesService.get(articleId).subscribe(article => {
        this.existingArticle = article;
        this.prepareForm(article);
      });
    } else {
      this.prepareForm();
    }
  }

  prepareForm(article?: Article): void {
    this.articleForm = this.formBuilder.group({
      title: [article?.title, Validators.required],
      author: [article?.author, Validators.required],
      content: [article?.content, Validators.required],
      createdAt: [article ? article.createdAt : new Date()]
    })
  }

  cancel(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  submitForm(): void {
    this.articleForm.markAllAsTouched();

    if (this.articleForm.invalid || this.submitLoading) return;

    this.submitLoading = true;
    const newArticle = { ...this.existingArticle, ...this.articleForm.getRawValue() };
    const request$ = this.existingArticle ? this.articlesService.update(newArticle) : this.articlesService.add(newArticle);

    request$.subscribe(
      () => {
        this.matSnackBar.open(this.existingArticle ? 'Article changed successfully' : 'Article added successfully');
        this.cancel();
      },
      () => {
        this.matSnackBar.open('Something went wrong');
        this.submitLoading = false;
      });
  }
}
