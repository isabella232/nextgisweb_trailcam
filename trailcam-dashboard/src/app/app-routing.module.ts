import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TagsComponent} from './components/tags/tags.component';
import {UploadComponent} from './components/upload/upload.component';
import {MediaComponent} from './components/media/media.component';
import {EmailComponent} from './components/email/email.component';

const routes: Routes = [
  {path: 'start', component: DashboardComponent},
  {path: 'media', component: MediaComponent},
  {path: 'tags', component: TagsComponent},
  {path: 'email', component: EmailComponent},
  {path: 'upload', component: UploadComponent},
  {path: '', redirectTo: 'start', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
