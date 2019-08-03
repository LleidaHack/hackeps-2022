import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

    this.auth.loginAfterRedirect();

    this.auth.user$.subscribe(user => {
      this.loading = false;
      console.log(user);
      // TODO: redirect to user profile
    });
  }

}
