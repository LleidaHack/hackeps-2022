import { AuthenticationService } from './../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UrlValidator } from '../shared/validators/url.validator';
import { UserModel } from '../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
  public loading = false;
  public signUpForm: FormGroup;
  private user: UserModel;

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router) {
      // TODO: UrlValidator specific for github and linkedin
    this.signUpForm = this.fb.group({
      fullName:     ['', Validators.compose([Validators.required,
                                             Validators.minLength(5)])],
      nickname:     ['', Validators.compose([Validators.required,
                                             Validators.minLength(2)])],
      email:        ['', Validators.compose([Validators.required,
                                             Validators.email])],
      birthDate:    ['', Validators.required],
      githubUrl:    ['', Validators.compose([Validators.required,
                                             UrlValidator.url])],
      linkedinUrl:  ['', UrlValidator.url],
      terms: ['', Validators.requiredTrue],
      // shirtSize: ['S'],
      food: [''],
      gdpr: ['']
    });
  }

  ngOnInit() {
    this.auth.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.signUpForm.get('email')
          .setValue(user.email);
        this.signUpForm.get('nickname')
          .setValue(user.displayName && user.displayName.split(' ')[0]);
        this.signUpForm.get('fullName')
          .setValue(user.displayName);
      }
    });
  }

  public onSubmit() {
    this.loading = true;
    const formData = this.signUpForm.value;
    formData.uid = this.user.uid;
    formData.photoURL = this.user.photoURL;
    formData.displayName = this.user.displayName;
    formData.accepted = 'PENDENT';

    this.auth.updateUserData(formData as UserModel)
      .then(() => {
        this.loading = false;
        this.router.navigateByUrl('/user');
      })
      .catch(e => {
        alert(JSON.stringify(e));
      });
  }

  public shouldShowError(name: string): boolean {
    return this.signUpForm.get(name).touched &&
           this.signUpForm.get(name).invalid;
  }
}
