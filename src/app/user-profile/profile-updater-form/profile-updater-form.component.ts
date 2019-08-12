import { AuthenticationService } from './../../shared/services/authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UrlValidator } from 'src/app/shared/validators/url.validator';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-profile-updater-form',
  templateUrl: './profile-updater-form.component.html',
  styleUrls: ['./profile-updater-form.component.scss']
})
export class ProfileUpdaterFormComponent implements OnInit {
  @Input() public user: UserModel;
  public profileUpdaterForm: FormGroup;

  constructor(
    private auth: AuthenticationService,
    private fb: FormBuilder) {
    this.profileUpdaterForm = this.fb.group({
      fullName:     ['', Validators.compose([Validators.required,
                                             Validators.minLength(10)])],
      nickname:     ['', Validators.compose([Validators.required,
                                             Validators.minLength(2)])],
      email:        ['', Validators.compose([Validators.required,
                                             Validators.email])],
      birthDate:    ['', Validators.required],
      githubUrl:    ['', Validators.compose([Validators.required,
                                             UrlValidator.url])],
      linkedinUrl:  ['', Validators.compose([Validators.required,
                                             UrlValidator.url])],
    });
  }

  ngOnInit() {
    console.log(this.user);

    this.profileUpdaterForm.get('nickname')
      .setValue(this.user.nickname);
    this.profileUpdaterForm.get('fullName')
      .setValue(this.user.fullName);
    this.profileUpdaterForm.get('email')
      .setValue(this.user.email);
    this.profileUpdaterForm.get('birthDate')
      .setValue(this.user.birthDate);
    this.profileUpdaterForm.get('githubUrl')
      .setValue(this.user.githubUrl);
    this.profileUpdaterForm.get('linkedinUrl')
      .setValue(this.user.linkedinUrl);
  }

  public onSubmit() {
    const formData = this.profileUpdaterForm.value;
    formData.uid = this.user.uid;
    formData.photoURL = this.user.photoURL;
    formData.displayName = this.user.displayName;
    this.auth.updateUserData(formData as UserModel)
      .then(() => {
      })
      .catch(e => {
        alert(JSON.stringify(e));
      });
  }
}
