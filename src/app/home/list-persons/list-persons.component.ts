import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {HomeService} from '../../services/home.service';
import {Person} from '../../Models/person';
import {Observable} from 'rxjs';
import { HomeComponent } from '../home.component';


@Component({
  selector: 'app-list-persons',
  templateUrl: './list-persons.component.html',
  styleUrls: ['./list-persons.component.css']
})
export class ListPersonsComponent implements OnInit {

  personas: Person[];
  person: Person;
  constructor(private hs: HomeService, private hc: HomeComponent) { }

  ngOnInit(): void {
    this.verPersonas();
  }

  verPersonas()
  {
      this.hs.viewPersons().snapshotChanges().subscribe(data =>{
      this.personas = [];
      data.forEach(i =>{
        let a = i.payload.toJSON();
        a['$key'] = i.key;
        this.personas.push(a as Person);
      });
    });
  }

  deletePerson(i: number)
  {
    this.hs.deletePerson(this.personas[i].$key);
    alert("Eliminado");
  }

  public exportData(i: number): void
  {
    this.person = new Person();
    this.person = this.personas[i];
    this.hc.getData(this.person);
  }
}
