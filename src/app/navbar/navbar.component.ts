import {Component, OnInit, ViewChild, DebugElement, Output, EventEmitter} from '@angular/core';
import {UserModel} from '../shared/models/user.model';
import {AuthenticationService} from '../shared/services/authentication.service';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UrlValidator} from '../shared/validators/url.validator';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user: UserModel;
  public url: string;
  public currentUrl: string;
  public code: string;
  public profileUpdaterForm: FormGroup;
  @Output() public loading = new EventEmitter<boolean>();

  @ViewChild('navbar', {
    static: true
  }) navbar: any;

  constructor(
    public auth: AuthenticationService,
    public route: Router,
    public actroute: ActivatedRoute,
  ) {
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
          this.actroute.queryParams
            .subscribe(params => {
                this.code = params.code;
                if (this.code) {
                  user.discordCode = this.code;
                  this.auth.updateUserData(user);
                }
              }
            );
          this.user = u;
        });
    });
  }

  public logout() {
    this.auth.signOut().then(() => this.navbar.hide());
  }

  /*Not logged url validator using regex*/
  public urlRegexValidator() {
    //Validate if the url is like --> '/#' + '<qualsevol paraula>'
    return new RegExp('[//#]\w*').test(this.currentUrl) || this.currentUrl === '/';
  }
}
