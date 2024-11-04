import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // ngModel

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';


//20240729 import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Screen01Component } from './screen01/screen01.component';
import { Screen01bisComponent } from './screen01bis/screen01bis.component';
import { Screen02Component } from './screen02/screen02.component';
import { Screen03Component } from './screen03/screen03.component';
import { Screen04Component } from './screen04/screen04.component';
import { Screen05Component } from './screen05/screen05.component';
import { Screen06Component } from './screen06/screen06.component';
import { Screen07Component } from './screen07/screen07.component';
import { Screen08Component } from './screen08/screen08.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Screen01accComponent } from './screen01acc/screen01acc.component';
import { Screen21accComponent } from './screen21acc/screen21acc.component';
import { Screen31accComponent } from './screen31acc/screen31acc.component';




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
    PageNotFoundComponent,
    Screen01bisComponent,
    Screen08Component,
    Screen01accComponent,
    Screen21accComponent,
    Screen31accComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
