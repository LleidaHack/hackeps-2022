import { AuthenticationService } from '../../shared/services/authentication.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user.model';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { faEnvelope, faLock, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons'
import { MustMatch } from 'src/app/shared/validators/sign.validator';

declare var particlesJS: any;

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  // FontAwesome
  public faEnvelope = faEnvelope;
  public faLock = faLock;
  public faPlus = faPlus;
  public faGooglePlusG = faGooglePlusG;

  public user: UserModel;
  private validatingForm: FormGroup;
  private showConfirmPassword: boolean;
  private signIn: boolean;
  private modalTitle: string;
  @Output() public afterLogin = new EventEmitter();

  constructor(private auth: AuthenticationService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.validatingForm = this.formBuilder.group({
      loginFormModalEmail: new FormControl('', Validators.compose([Validators.email, Validators.required])),
      loginFormModalPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
      loginFormModalConfirmPassword: new FormControl('', Validators.compose([Validators.required]))
    },{
      validator: MustMatch('loginFormModalPassword', 'loginFormModalConfirmPassword')
    });
    particlesJS('particles-js', {
      'particles': {
        'number': {
          'value': 80,
          'density': {
            'enable': true,
            'value_area': 800
          }
        },
        color: {
          value: '#e1bee7'
        },
        shape: {
          'type': 'circle',
          'stroke': {
            'width': 0,
          },
          'polygon': {
            'nb_sides': 5
          },
        },
        'opacity': {
          'value': 0.5,
          'random': false,
          'anim': {
            'enable': false,
          }
        },
        'size': {
          'value': 3,
          'random': true,
          'anim': {
            'enable': false,
          }
        },
        'line_linked': {
          'enable': true,
          'distance': 150,
          'color': '#f3e5f5',
          'opacity': 0.4,
          'width': 1
        },
        'move': {
          'enable': true,
          'speed': 6,
          'direction': 'none',
          'random': false,
          'straight': false,
          'out_mode': 'out',
          'bounce': false,
          'attract': {
            'enable': false,
            'rotateX': 600,
            'rotateY': 1200
          }
        }
      },
      'interactivity': {
        'detect_on': 'canvas',
        'events': {
          'onhover': {
            'enable': true,
            'mode': 'bubble'
          },
          'onclick': {
            'enable': false,
            'mode': 'push'
          },
          'resize': true
        },
        'modes': {
          'grab': {
            'distance': 400,
            'line_linked': {
              'opacity': 1
            }
          },
          'bubble': {
            'distance': 400,
            'size': 10,
            'duration': 2,
            'opacity': 8,
            'speed': 3
          },
          'repulse': {
            'distance': 200,
            'duration': 0.4
          },
          'push': {
            'particles_nb': 4
          },
          'remove': {
            'particles_nb': 2
          }
        }
      },
      'retina_detect': true
    });
  }

  get loginFormModalEmail() {
    return this.validatingForm.get('loginFormModalEmail');
  }

  get loginFormModalPassword() {
    return this.validatingForm.get('loginFormModalPassword');
  }

  get loginFormModalConfirmPassword() {
    return this.validatingForm.get('loginFormModalConfirmPassword');
  }

  getShowConfirmPassword() {
    return this.showConfirmPassword
  }

  enableSignIn() {
    this.signIn = true;
  }

  enableSignUp() {
    this.signIn = false;
  }

  getSignIn() {
    return this.signIn;
  }

  getModalTitle(){
    return this.modalTitle;
  }

  enableConfirmPassword() {
    this.showConfirmPassword = true;
    this.modalTitle = "Únete ahora!"
  }

  disableConfirmPassword() {
    this.showConfirmPassword = false;
    this.modalTitle = "Entra ahora!"
  }

  public loginWithGoogle() {
    this.auth.redirectToLogin();
  }

  public signInSignUpMailAndPass() {
    if (this.showConfirmPassword) {
      this.signUpWithMailAndPass();
    } else {
      this.signInWithMailAndPass();
    }
  }

  public signInWithMailAndPass() {
    this.auth.loginWithMailAndPassword(this.loginFormModalEmail.value, this.loginFormModalPassword.value)
  }

  public signUpWithMailAndPass() {
    this.auth.mailSignUp(this.loginFormModalEmail.value, this.loginFormModalPassword.value);
  }

}
