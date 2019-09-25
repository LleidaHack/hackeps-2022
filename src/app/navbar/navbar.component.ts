import { Component, OnInit, ViewChild, DebugElement } from '@angular/core';
import { UserModel } from '../shared/models/user.model';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user: UserModel;
  public url: string;
  public currentUrl: string;

  @ViewChild('navbar', {
    static: true
  }) navbar: any;

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

  /*Not logged url validator using regex*/
  public urlRegexValidator(){
    var partialUrl = new RegExp('[//#]\w*'); //Validate if the url is like --> '/#' + '<qualsevol paraula>'
    return partialUrl.test(this.currentUrl) || this.currentUrl === '/';
   
  }
}
