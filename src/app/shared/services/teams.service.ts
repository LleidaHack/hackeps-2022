import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { Observable, forkJoin, from, of, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private teamsCollection: AngularFirestoreCollection<Team>;

  constructor(private afs: AngularFirestore) {
    this.teamsCollection = afs.collection('teams');
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
      creator: this.afs.doc(`/users/${user.uid}`).ref,
      members: [],
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

  public getMembersOfTeam(team: Team)
    : Observable<{creator: UserModel, members: UserModel[]}> {
    const creator$ = team.creator.get();
    const members$ = team.members.map(m => m.get());

    return forkJoin(members$.concat(creator$)).pipe(
      map((res: DocumentSnapshot<UserModel>[]) => {
        const members =
          res.slice(0, res.length - 1).map(m => m.data());

        const creator = res[res.length - 1].data();

        return { creator, members };
      })
    );
  }

  public getTeamByUser(user: UserModel): Observable<Team> {
    const userRef = this.afs.collection('users').doc(user.uid).ref;
    const collectionRef = this.teamsCollection.ref;

    const creatorTeam = collectionRef.where('creator', '==', userRef)
                                      .limit(1);

    const member = collectionRef.where('members',
                                       'array-contains',
                                       userRef)
                                .limit(1);

    return new Observable<Team>(obs => {
      forkJoin(creatorTeam.get(), member.get()).subscribe(
        (res: [QuerySnapshot<Team>, QuerySnapshot<Team>]) => {
          if (res[0].docs.length > 0) {
            // Found the team which `user` is the creator
            obs.next(res[0].docs[0].data());
          } else if (res[1].docs.length > 0) {
            // Found the team which `user` is a member
            obs.next(res[1].docs[0].data());
          } else {
            obs.next(null);
          }
          obs.complete();
        }
      );
    });
  }

  private pushNewMember(team: Team, user: UserModel, obs: Subscriber<string>) {

    if (team.members.length < 3) {
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
      obs.next('El equipo ya dispone de 3 miembros más el creador');
      obs.complete();
    }
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
