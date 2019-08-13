import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable, forkJoin } from 'rxjs';
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

  public create(user: UserModel, teamName: string): Promise<void> {
    return this.teamsCollection.doc(teamName).set({
      creator: this.afs.doc(`/users/${user.uid}`).ref,
      members: [],
      name: teamName
    } as Team);
  }

  public get(name: string): Observable<Team> {
    return this.teamsCollection.doc(name).snapshotChanges().pipe(
      map(snapshot => {
        const team = snapshot.payload.data() as Team;
        return team;
      })
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

  public getTeamByUser(user: UserModel) {

  }
}
