import { AuthenticationService } from './../shared/services/authentication.service';
import { DateValidator } from './../shared/validators/date.validator';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UrlValidator } from '../shared/validators/url.validator';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
  public signUpForm: FormGroup;
  public terms = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService) {
    this.signUpForm = this.fb.group({
      fullName:     ['', Validators.compose([Validators.required,
                                             Validators.minLength(10)])],
      nickname:     ['', Validators.compose([Validators.required,
                                             Validators.minLength(2)])],
      email:        ['', Validators.compose([Validators.required,
                                             Validators.email])],
      birthDate:    ['', Validators.compose([Validators.required,
                                             DateValidator.ptDate])],
      githubUrl:    ['', Validators.compose([Validators.required,
                                             UrlValidator.url])],
      linkedinUrl:  ['', Validators.compose([Validators.required,
                                             UrlValidator.url])]
    });
  }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.signUpForm.get('email')
          .setValue(user.email);
        this.signUpForm.get('nickname')
          .setValue(user.displayName.split(' ')[0]);
        this.signUpForm.get('fullName')
          .setValue(user.displayName);
      }
    });
  }

  public onSubmit() {

  }
}
