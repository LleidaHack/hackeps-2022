import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/firestore';
import { FAQ } from '../models/faq';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FaqsService {

  private faqsCollection: AngularFirestoreCollection<FAQ>;

  constructor(private afs: AngularFirestore) {
    this.faqsCollection = afs.collection('faqs');
  }

  public all(): Observable<FAQ[]> {
    return this.faqsCollection.get().pipe(
      map(value => {
        const result = [];
        value.forEach(d => result.push(d.data()));
        return result.sort((a, b) => a.order - b.order);
      })
    );
  }
}
