import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import {
    ArticleDetailsComponent
} from './components/articles/article-details/article-details.component';
import { ArticlesListComponent } from './components/articles/articles-list/articles-list.component';
import { ArticlesComponent } from './components/articles/articles.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        redirectTo: 'articles',
        pathMatch: 'full'
      },
      {
        path: 'articles',
        component: ArticlesComponent,
        children: [
          {
            path: '',
            component: ArticlesListComponent
          },
          {
            path: ':id',
            component: ArticleDetailsComponent
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
