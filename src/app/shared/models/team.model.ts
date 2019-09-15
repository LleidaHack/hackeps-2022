import { DocumentReference } from '@angular/fire/firestore';

export interface Team {
  uid: string;
  name: string;
  members: DocumentReference[];
}
