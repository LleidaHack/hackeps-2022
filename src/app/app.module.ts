// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// MDBBootstrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { environment } from '../environments/environment';
import { BannerComponent } from './home/banner/banner.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Bootstrap
    MDBBootstrapModule.forRoot(),

    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
