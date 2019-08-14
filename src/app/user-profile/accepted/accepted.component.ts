import { UserModel } from 'src/app/shared/models/user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accepted',
  templateUrl: './accepted.component.html',
  styleUrls: ['./accepted.component.scss']
})
export class AcceptedComponent implements OnInit {
  @Input() public user: UserModel;

  constructor() { }

  ngOnInit() {
  }

}
