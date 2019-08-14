import { TeamsService } from './../../shared/services/teams.service';
import { UserModel } from './../../shared/models/user.model';
import { Component, OnInit, Input } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-team-build',
  templateUrl: './team-build.component.html',
  styleUrls: ['./team-build.component.scss']
})
export class TeamBuildComponent implements OnInit {
  @Input() public user: UserModel;

  public teamCode: string;
  public teamName: string;
  public error: string;

  public loadingTeam = true;
  public iAmCreator = false;
  public team: {
    uid?: string,
    name?: string,
    creator?: UserModel,
    members?: UserModel[]
  };

  constructor(private teamService: TeamsService) { }

  ngOnInit() {
    this.fetchTeam();
  }

  private fetchTeam() {
    this.teamService.getTeamByUser(this.user).subscribe(t => {

      if (isNullOrUndefined(t)) {
        this.loadingTeam = false;
      } else {
        this.teamService.getMembersOfTeam(t).subscribe(r => {
          this.team = {
            uid: t.uid,
            name: t.name,
            creator: r.creator,
            members: r.members
          };
          this.iAmCreator = r.creator.uid === this.user.uid;
          this.loadingTeam = false;
        });
      }
    });
  }

  public joinTeam(modal: any) {
    if (!this.teamCode || this.teamCode === '') {
      this.error = 'El código de equipo no pude estar en blanco';
      setTimeout(() => this.error = '', 5000);
      return;
    }

    this.teamService.addMemberByCode(this.teamCode, this.user).subscribe(err => {
      if (err !== 'Ok') {
        this.error = err;
        setTimeout(() => this.error = '', 5000);
      } else {
        this.loadingTeam = true;
        this.fetchTeam();
        modal.hide();
      }
    });
  }

  public createTeam(modal: any) {
    if (!this.teamName || this.teamName === '') {
      this.error = 'El código de equipo no pude estar en blanco';
      setTimeout(() => this.error = '', 5000);
      return;
    }

    this.teamService.exists(this.teamName).subscribe(exists => {
      if (exists) {
        this.error = `Ya existe un equipo con el nombre ${this.teamName}`;
        setTimeout(() => this.error = '', 5000);
      } else {
        this.teamService.create(this.user, this.teamName).subscribe(team => {
          if (isNullOrUndefined(team)) {
            this.error = `Error al crear el equipo. Vuelve a probar más tarde`;
            setTimeout(() => this.error = '', 5000);
          } else {
            this.iAmCreator = true;
            this.team = {
              uid: team.uid,
              members: [],
              creator: this.user,
              name: team.name
            };
            modal.hide();
          }
        });
      }
    });
  }
}
