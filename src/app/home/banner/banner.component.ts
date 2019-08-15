import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user.model';
import {FormControl, FormGroup, Validators} from "@angular/forms";


declare var particlesJS: any;

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  private user: UserModel;
  
  constructor(private auth: AuthenticationService) { }
  ngOnInit() {
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
  public login() {
    this.auth.redirectToLogin();
  }
}
