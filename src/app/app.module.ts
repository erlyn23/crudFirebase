import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { ListPersonsComponent } from './home/list-persons/list-persons.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListPersonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
