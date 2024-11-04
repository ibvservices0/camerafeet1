import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Screen01Component } from './screen01/screen01.component';
import { Screen01accComponent } from './screen01acc/screen01acc.component';
import { Screen01bisComponent } from './screen01bis/screen01bis.component';
import { Screen02Component } from './screen02/screen02.component';
import { Screen03Component } from './screen03/screen03.component';
import { Screen04Component } from './screen04/screen04.component';
import { Screen05Component } from './screen05/screen05.component';
import { Screen06Component } from './screen06/screen06.component';
import { Screen07Component } from './screen07/screen07.component';
import { Screen08Component } from './screen08/screen08.component';
import { Screen21accComponent } from './screen21acc/screen21acc.component';
import { Screen31accComponent } from './screen31acc/screen31acc.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: 'screen01', component: Screen01Component },
  { path: 'screen01/:input', component: Screen01Component },
  { path: 'screen01acc', component: Screen01accComponent },
  { path: 'screen01bis', component: Screen01bisComponent },
  { path: 'screen02', component: Screen02Component },
  { path: 'screen03', component: Screen03Component },
  { path: 'screen04', component: Screen04Component },
  { path: 'screen05', component: Screen05Component },
  { path: 'screen06', component: Screen06Component },
  { path: 'screen07', component: Screen07Component },
  { path: 'screen08', component: Screen08Component },
  { path: 'screen21acc', component: Screen21accComponent },
  { path: 'screen31acc', component: Screen31accComponent },
  { path: '',   redirectTo: '/screen01', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
