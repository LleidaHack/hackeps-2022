import { AuthenticationService } from './../../shared/services/authentication.service';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UrlValidator } from 'src/app/shared/validators/url.validator';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-profile-updater-form',
  templateUrl: './profile-updater-form.component.html',
  styleUrls: ['./profile-updater-form.component.scss']
})
export class ProfileUpdaterFormComponent implements OnInit, OnChanges {

  @Input() public user: UserModel;
  @Output() public loading = new EventEmitter<boolean>();
  public profileUpdaterForm: FormGroup;

  constructor(
    private auth: AuthenticationService,
    private fb: FormBuilder) {
    // TODO: UrlValidator specific for github and linkedin
    this.profileUpdaterForm = this.fb.group({
      fullName:     ['', Validators.compose([Validators.required,
                                             Validators.minLength(10)])],
      nickname:     ['', Validators.compose([Validators.required,
                                             Validators.minLength(2)])],
      birthDate:    ['', Validators.required],
      street:        ['', Validators.required],
      githubUrl:    ['', Validators.compose([Validators.required,
                                             UrlValidator.url])],
      linkedinUrl:  ['', Validators.compose([UrlValidator.url])],
      food: [''],
      gdpr: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {

    this.profileUpdaterForm.get('nickname')
      .setValue(this.user.nickname);
    this.profileUpdaterForm.get('fullName')
      .setValue(this.user.fullName);
    this.profileUpdaterForm.get('birthDate')
      .setValue(this.user.birthDate);
    this.profileUpdaterForm.get('githubUrl')
      .setValue(this.user.githubUrl);
    this.profileUpdaterForm.get('linkedinUrl')
      .setValue(this.user.linkedinUrl);
    this.profileUpdaterForm.get('food')
      .setValue(this.user.food);
    this.profileUpdaterForm.get('gdpr')
      .setValue(this.user.gdpr);
    this.profileUpdaterForm.get('street')
      .setValue(this.user.street);
  }

  public onSubmit() {
    this.loading.emit(true);
    const formData = this.profileUpdaterForm.value;
    formData.uid = this.user.uid;
    formData.photoURL = this.user.photoURL;
    formData.displayName = this.user.displayName;
    formData.accepted = this.user.accepted || 'PENDENT';

    this.auth.updateUserData(formData as UserModel)
      .then(() => {
        this.loading.emit(false);
      })
      .catch(e => {
        alert(JSON.stringify(e));
      });
  }
}
