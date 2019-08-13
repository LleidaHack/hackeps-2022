import { TeamsService } from './../../shared/services/teams.service';
import { UserModel } from './../../shared/models/user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-team-build',
  templateUrl: './team-build.component.html',
  styleUrls: ['./team-build.component.scss']
})
export class TeamBuildComponent implements OnInit {
  @Input() public user: UserModel;
  public teamName: string;

  constructor(private teamService: TeamsService) { }

  ngOnInit() {
    this.teamService.get('test').subscribe(t => {
      console.log(t);
      this.teamService.getMembersOfTeam(t).subscribe(r => {
        console.log(r)
      });
    });
  }

  public createTeam() {
    if (this.teamName) {
      this.teamService.create(this.user, this.teamName);
    }
  }
}
