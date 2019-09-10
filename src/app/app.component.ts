import { AuthenticationService } from './shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { UserModel } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public user: UserModel;

  constructor(public auth: AuthenticationService) {
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
    this.auth.signOut();
  }
}
