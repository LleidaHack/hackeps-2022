// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// QR Generator
import { QRCodeModule } from 'angularx-qrcode';

// MDBBootstrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { environment } from '../environments/environment';

import { BannerComponent } from './home/banner/banner.component';
import { HomeComponent } from './home/home.component';

import { FaqsComponent } from './home/faqs/faqs.component';
import { SponsorsComponent } from './home/sponsors/sponsors.component';
import { CalendarComponent } from './home/calendar/calendar.component';
import { LoadingOverlayComponent } from './shared/loading-overlay/loading-overlay.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { ProfileUpdaterFormComponent } from './user-profile/profile-updater-form/profile-updater-form.component';
import { TeamBuildComponent } from './user-profile/team-build/team-build.component';
import { AcceptedComponent } from './user-profile/accepted/accepted.component';
import { AuthGuard } from './shared/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    HomeComponent,
    FaqsComponent,
    SponsorsComponent,
    CalendarComponent,
    LoadingOverlayComponent,
    UserProfileComponent,
    SignUpFormComponent,
    ProfileUpdaterFormComponent,
    TeamBuildComponent,
    AcceptedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    // Bootstrap
    MDBBootstrapModule.forRoot(),

    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,

    // QR Generator
    QRCodeModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
