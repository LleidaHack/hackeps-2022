import { AuthenticationService } from '../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../shared/models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public loading = true;
  public user: UserModel;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.afAuth.auth.onAuthStateChanged(user => {
      if (!user) {
        this.loading = false;
        return;
      }
      this.auth.fetchUserData(user.uid)
        .subscribe(u => {
          this.user = u;
          this.loading = false;
          if(!this.user.photoURL) {
            this.user.photoURL = "https://www.fillmurray.com/600/600";
          }
        });
    });
  }
}
