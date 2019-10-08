import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { Observable, forkJoin, from, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { Team } from '../models/team.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private teamsCollection: AngularFirestoreCollection<Team>;

  constructor(private afs: AngularFirestore) {
    const collection = `${environment.baseCollection}/teams`;
    this.teamsCollection = afs.collection(collection);
  }

  private generateUid(length: number) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public create(user: UserModel, teamName: string): Observable<Team> {
    const code = this.generateUid(15);
    const newTeam = {
      uid: code,
      // TODO: Update for next version
      members: [this.afs.doc(`/users/${user.uid}`).ref],
      name: teamName
    };

    return new Observable(obs => {
      this.teamsCollection.doc(teamName).set(newTeam as Team).then(() => {
        obs.next(newTeam);
        obs.complete();
      })
      .catch(() => {
        obs.next(null);
        obs.complete();
      });
    });

  }

  public get(name: string): Observable<Team> {
    return this.teamsCollection.doc(name).snapshotChanges().pipe(
      map(snapshot => {
        const team = snapshot.payload.data() as Team;
        return team;
      })
    );
  }

  public exists(teamName: string): Observable<boolean> {
    const teamRef = this.teamsCollection.doc(teamName).ref;
    return from(teamRef.get()).pipe(
      map((r: DocumentSnapshot<Team>) => r.exists)
    );
  }

  public getMembersOfTeam(team: Team): Observable<UserModel[]> {
    // TODO: Update for next version
    const members$ = team.members.map(
      m => this.afs.doc(`${environment.baseCollection}/${m.path}`).get());

    return forkJoin(members$).pipe(
      map((res: DocumentSnapshot<UserModel>[]) => {
        const members = res.map(m => m.data());
        return members;
      })
    );
  }

  public getTeamByUser(user: UserModel): Observable<Team> {
    const userRef = this.afs.collection('users').doc(user.uid).ref;
    const collectionRef = this.teamsCollection.ref;

    const member = collectionRef.where('members',
                                       'array-contains',
                                       userRef)
                                .limit(1);

    return new Observable<Team>(obs => {
      from(member.get()).subscribe(
        (res: QuerySnapshot<Team>) => {
          if (res.docs.length > 0) {
            obs.next(res.docs[0].data());
          } else {
            obs.next(null);
          }
          obs.complete();
        }
      );
    });
  }

  private pushNewMember(team: Team, user: UserModel, obs: Subscriber<string>) {
    if (team.members.length < 4) {
      const userRef = this.afs.doc(`/users/${user.uid}`).ref;
      team.members.push(userRef);
      this.teamsCollection.doc(team.name).set(team)
        .then(() => {
          obs.next('Ok');
          obs.complete();
        }).catch(() => {
          this.nextUnexpectedError(obs);
        });
    } else {
      obs.next('El equipo ya dispone de 4 miembros más el creador');
      obs.complete();
    }
  }

  public removeMember(team: Team, user: UserModel) {
    const userRef = this.afs.doc(`/users/${user.uid}`).ref;
    const willDelete = team.members.length === 1;
    return new Observable(obs => {
      if (willDelete) {
        // If the team is composed of a single member
        // We delete the team collection instead of only the member
        this.teamsCollection.doc(team.name).delete().then(() => {
          obs.next('Ok');
          obs.complete();
        })
        .catch(() => {
          this.nextUnexpectedError(obs);
        });
      } else {
        team.members.splice(team.members.indexOf(userRef), 1);
        this.teamsCollection.doc(team.name).set(team)
          .then(() => {
            obs.next('Ok');
            obs.complete();
          }).catch(() => {
            this.nextUnexpectedError(obs);
          });
      }
    });
  }

  public addMemberByCode(teamCode: string, user: UserModel): Observable<string> {
    return new Observable(obs => {
      this.teamsCollection.ref.where('uid', '==', teamCode).get().then(
        (team: QuerySnapshot<Team>) => {
          if (team.docs.length > 0) {
            this.pushNewMember(team.docs[0].data(), user, obs);
          } else {
            obs.next(`El equipo con código ${teamCode} no existe`);
            obs.complete();
          }
        }
      ).catch(() => {
        this.nextUnexpectedError(obs);
      });
    });
  }

  private nextUnexpectedError(obs: Subscriber<string>) {
    obs.next('Error no esperado. Prueba más tarde');
    obs.complete();
  }
}
