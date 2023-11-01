import { Component } from '@angular/core';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent {
  images = [
    {
      url: '../assets/images/img1.jpg',
      title: 'Imagen 1',
      description: 'Esta es la descripción de la imagen 1.'
    },
    {
      url: '../assets/images/img2.png',
      title: 'Imagen 2',
      description: 'Esta es la descripción de la imagen 2.'
    },
    {
      url: '../assets/images/img3.jpg',
      title: 'Imagen 3',
      description: 'Esta es la descripción de la imagen 2.'
    },
  ];
}
