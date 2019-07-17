import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  /**
   * @type {Observable<any>} test
   * @type {AngularFirestoreCollection<Book>} testCollection
   */
  public test: Observable<any | null>;
  public testCollection: AngularFirestoreCollection<any>;

  /**
   * @constructor FirebaseService
   * @param {AngularFirestore} afs
   * @param {UserService} userService
   */
  constructor(private afs: AngularFirestore) {
    this.testCollection = this.afs.collection('test');
  }

  /**
   * create void function
   * Add a new test to test collection.
   * @param {any} testData
   * @memberof BookService
   */
  public create(testData: any) {
    // Persist a document id
    const id = this.afs.createId();
    testData.id = id;
    this.testCollection.add(testData);
  }

  public all(): Observable<QuerySnapshot<any>> {
    return this.testCollection.get();
  }
}
