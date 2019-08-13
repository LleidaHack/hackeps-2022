import { DocumentReference } from '@angular/fire/firestore';

export interface Team {
  name: string;
  creator: DocumentReference;
  members: DocumentReference[];
}
