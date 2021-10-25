import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
    ArticleDetailsComponent
} from './components/articles/article-details/article-details.component';
import {
    CommentCardComponent
} from './components/articles/article-details/comment-card/comment-card.component';
import { ArticlesListComponent } from './components/articles/articles-list/articles-list.component';
import {
    DeleteConfirmationComponent
} from './components/articles/articles-list/delete-confirmation/delete-confirmation.component';
import { ArticlesComponent } from './components/articles/articles.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesListComponent,
    ArticlesComponent,
    ArticleDetailsComponent,
    CommentCardComponent,
    DeleteConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
