import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadosService } from './services/estados/estados.service';
import { PaisesService } from './services/paises/paises.service';
import { PersonasService } from './services/personas/personas.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  personaForm: FormGroup | any;
  paises: any;
  estados: any;
  personas: any;

  constructor(
    public fb: FormBuilder,
    public estadosService: EstadosService,
    public paisesService: PaisesService,
    public personasService: PersonasService
  ) {

  }
  ngOnInit(): void {

    this.personaForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
    })

    this.paisesService.getAllPaises().subscribe(resp => {
      this.paises = resp;
    },
      error => { console.error(error) }
    );

    this.personasService.getAllPersonas().subscribe(resp => {
      this.personas = resp;
    },
    error => { console.error(error) }
    );

    this.personaForm.get('pais').valueChanges.subscribe((value: { id: string; }) => {
      this.estadosService.getAllEstadosByPais(value.id).subscribe(resp => {
        this.estados = resp;
      },
        error => { console.error(error) }
      )
    })
  }

  guardar(): void {
    this.personasService.savePersona(this.personaForm.value).subscribe(resp => {
      this.personaForm.reset();
      this.personas = this.personas.filter((persona: { id: any; }) => resp.id != persona.id)
      this.personas.push(resp);
    },
      error => { console.error(error) }
    )
  }

  eliminar(persona: any): void{
    this.personasService.deletePersona(persona.id).subscribe(resp => {
      console.log(resp);
      if(resp === true){
        this.personas.pop(persona)
      }
    },
      error => { console.error(error) }
    )
  }

  editar(persona:any): void{
    this.personaForm.setValue({
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      edad: persona.edad,
      pais: persona.pais,
      estado: persona.estado,
    })
  }
}
