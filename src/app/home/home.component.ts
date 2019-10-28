import { AuthenticationService } from '../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserModel } from '../shared/models/user.model';
import { ReturnStatement } from '@angular/compiler';
import { RouterExtService } from '../shared/services/router-ext.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loading: boolean;
  private previousUrl: string;
  private currentUrl: string;

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private routerExt: RouterExtService) {
    }

  ngOnInit() {
    this.loading = true;
    if (this.routerExt.getPreviousUrl() === '/user') {
      this.loading = false;
      return;
    }

    this.auth.loginAfterRedirect().then(creds => {
      this.checkAndRedirect(creds.user);
    }).catch(e => alert(JSON.stringify(e)));
  }

  public async checkAndRedirect(user: UserModel) {
    if (!user) {
      this.loading = false;
      return;
    }

    if (await this.auth.isRegistered(user)) {
      await this.router.navigateByUrl('/user');
    } else {
      await this.router.navigateByUrl('/');
    }
    this.loading = false;
  }
}
