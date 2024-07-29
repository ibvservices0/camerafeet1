import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';


//20240729 import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Screen01Component } from './screen01/screen01.component';
import { Screen02Component } from './screen02/screen02.component';
import { Screen03Component } from './screen03/screen03.component';
import { Screen04Component } from './screen04/screen04.component';
import { Screen05Component } from './screen05/screen05.component';
import { Screen06Component } from './screen06/screen06.component';
import { Screen07Component } from './screen07/screen07.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';




@NgModule({
  declarations: [
    AppComponent,
    Screen01Component,
    Screen02Component,
    Screen03Component,
    Screen04Component,
    Screen05Component,
    Screen06Component,
    Screen07Component,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
