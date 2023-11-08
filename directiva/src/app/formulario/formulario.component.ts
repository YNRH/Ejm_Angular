
import { Component } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  nombre: string = '';
  email: string = '';

  onSubmit() {
    console.log('Formulario enviado');
    console.log(`Nombre: ${this.nombre}`); 
    console.log(`Email: ${this.email}`); 
  }
}

