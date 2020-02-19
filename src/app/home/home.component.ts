import { Component, OnInit } from '@angular/core';
import { FirebaseDatabase } from '@angular/fire';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../services/home.service';
import { Person } from '../Models/person';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fg: FormGroup;
  persona: Person;
  comprobar: boolean = false;
  constructor(private fb: FormBuilder, private hs: HomeService) { }
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ngOnInit(): void {
    this.fg = this.fb.group({
      cedula: ["",[Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      nombre: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      apellido: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      telefono: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern(this.emailPattern)]],
      edad: ["",[Validators.required, Validators.minLength(1), Validators.maxLength(2)]]
    });
  }

  SavePerson()
  {
    if(this.fg.valid){
      alert('saved');
      this.hs.addPerson(this.fg.value);
      this.fg.reset();
    }else{
      console.log('error');
    }
  }

  updatePerson()
  {
    if(this.fg.valid)
    {
      const $key = this.persona.$key;
      delete this.persona.$key;
      this.hs.updatePerson(this.fg.value, $key);
      alert("Persona modificada correctamente");
      this.fg.reset();
      this.comprobar = false;
    }
    else
    {
      alert("No pudimos modificar a la persona");
    }
  }

  getData(per: Person)
  {
    if(per != null)
    {
      this.persona = per;
      this.fg.controls.cedula.setValue(this.persona.cedula);
      this.fg.controls.nombre.setValue(this.persona.nombre);
      this.fg.controls.apellido.setValue(this.persona.apellido);
      this.fg.controls.telefono.setValue(this.persona.telefono);
      this.fg.controls.email.setValue(this.persona.email);
      this.fg.controls.edad.setValue(this.persona.edad);
      this.comprobar = true;
      return this.persona;      
    }
    else
    {
      alert("No hay datos");
      this.comprobar = false;
      return null;
    } 
  }

  get cedula()
  {
    return this.fg.get('cedula');
  }

  get nombre()
  {
    return this.fg.get('nombre');
  }

  get apellido()
  {
    return this.fg.get('apellido');
  }

  get telefono()
  {
    return this.fg.get('telefono');
  }
  get direccion()
  {
    return this.fg.get('direccion');
  }

  get email()
  {
    return this.fg.get('email');
  }
  get edad()
  {
    return this.fg.get('edad');
  }
}