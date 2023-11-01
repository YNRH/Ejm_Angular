import { Component } from '@angular/core';

@Component({
  selector: 'app-saludo',
  templateUrl: './saludo.component.html',
  styleUrls: ['./saludo.component.css']
})
export class SaludoComponent {
  titulo:string = 'Bienvenido a aAngular!';
  mensaje: string = 'Este es un componente de saludo creado en Angular.';

  constructor(){}
  ngOnInit(): void{}
}
