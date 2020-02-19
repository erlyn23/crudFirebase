import { Injectable } from '@angular/core';
import { Person } from '../Models/person';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  listdb: AngularFireList<any>;

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) { }

  addPerson(per: Person)
  {
    return this.db.list('person').push(per);
  }

  viewPersons()
  {
     return this.listdb = this.db.list('person');
  }

  updatePerson(per: Person, key:string)
  {
    return this.db.list('person').update(key, per);
  }

  deletePerson($key)
  {
    return this.db.list('person').remove($key);
  }
}
