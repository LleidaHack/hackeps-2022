import { AuthenticationService } from './shared/services/authentication.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from './shared/models/user.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NavbarComponent } from 'angular-bootstrap-md';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public user: UserModel;
  public url: string;
  public currentUrl: string;

  @ViewChild('navbar', { static: true }) navbar: NavbarComponent;

  constructor(
    public auth: AuthenticationService,
    public route: Router) {

      route.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.currentUrl = event.url;
          this.navbar.hide();
        }
      });
  }

  ngOnInit() {

    this.auth.user$.subscribe((user) => {
      if (!user) {
        this.user = null;
        return;
      }
      this.auth.fetchUserData(user.uid)
      .subscribe(u => {
        this.user = u;
      });
    });
  }

  public logout() {
    this.auth.signOut().then(() => this.navbar.hide());
  }
}
