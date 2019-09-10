import { AuthenticationService } from '../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../shared/models/user.model';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loading: boolean;

  constructor(
    private auth: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.loading = true;

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
      this.router.navigateByUrl('/user').then(() => this.loading = false);
    } else {
      this.router.navigateByUrl('/user/signup').then(() => this.loading = false);
    }
  }
}