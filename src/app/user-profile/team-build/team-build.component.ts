import { Team } from './../../shared/models/team.model';
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
  public team: {
    uid?: string,
    name?: string,
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
        this.teamService.getMembersOfTeam(t).subscribe(members => {
          this.team = {
            uid: t.uid,
            name: t.name,
            members
          };
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
            this.team = {
              uid: team.uid,
              members: [this.user],
              name: team.name
            };
            modal.hide();
          }
        });
      }
    });
  }

  public leaveTeam(modal: any) {
    this.teamService.getTeamByUser(this.user).subscribe(
      team => {
        if (team) {
          this.teamService.removeMember(team, this.user).subscribe(msg => {
            if (msg !== 'Ok') {
              this.error = 'Error inesperado, intentalo más tarde';
              setTimeout(() => this.error = '', 5000);
            } else {
              this.team = null;
              modal.hide();
            }
          });
        } else {
          this.error = 'Error al obtener los datos del equipo';
          setTimeout(() => this.error = '', 5000);
        }
      }
    );
  }
}
