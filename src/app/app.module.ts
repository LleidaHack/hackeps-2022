// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// MDBBootstrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { environment } from '../environments/environment';
import { TitleCasePipe } from 'src/assets/utils/pipes/titleCasePipe';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    TitleCasePipe
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
