import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as XLSX from 'xlsx';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-reporte-peliculas',
  templateUrl: './reporte-peliculas.component.html',
  styleUrls: ['./reporte-peliculas.component.css']
})
export class ReportePeliculasComponent implements OnInit {
  peliculas: any[] = [];
  filtro: string = '';


  constructor(private http: HttpClient) {
    (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit() {
    this.http.get<any[]>('./assets/peliculas.json').subscribe(data => {
      this.peliculas = data;
    });
  }

  filtrarPeliculas() {
    if (this.filtro.trim() !== '') {
      const filtroLower = this.filtro.toLowerCase().trim();
  
      // Realizar el filtrado basado en el criterio de género o año de lanzamiento
      this.peliculas = this.peliculas.filter(pelicula =>
        pelicula.genero.toLowerCase().includes(filtroLower) ||
        pelicula.lanzamiento.toString().includes(filtroLower)
      );
    } else {
      // Si el campo de filtro está vacío, mostrar todas las películas
      this.http.get<any[]>('./assets/peliculas.json').subscribe(data => {
        this.peliculas = data;
      });
    }
  }

  exportarExcel() {
    const data = this.peliculas.map(pelicula => ({
      Título: pelicula.titulo,
      Género: pelicula.genero,
      'Año de lanzamiento': pelicula.lanzamiento.toString()
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Peliculas');
  
    XLSX.writeFile(workbook, 'peliculas.xlsx');
  }

  exportarCSV() {
    const header = ['Título', 'Género', 'Año de lanzamiento'];
    const csvData = [
      header,
      ...this.peliculas.map(pelicula => [
        pelicula.titulo,
        pelicula.genero,
        pelicula.lanzamiento.toString()
      ])
    ];
  
    const csv = Papa.unparse(csvData);
  
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
  
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'peliculas.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  
  

  generarPDF() {
    let peliculasFiltradas = this.peliculas;

    const contenido = [
      { text: 'Informe de Películas', style: 'header' },
      { text: '\n\n' },
      {
        table: {
          headerRows: 1,
          widths: ['*', '*', '*'],
          body: [
            [
              { text: 'Título', style: 'tableHeader' },
              { text: 'Género', style: 'tableHeader' },
              { text: 'Año de lanzamiento', style: 'tableHeader' }
            ],
            ...this.peliculas.map(pelicula => [
              { text: pelicula.titulo, style: 'bodyText' },
              { text: pelicula.genero, style: 'bodyText' },
              { text: pelicula.lanzamiento.toString(), style: 'bodyText' }
            ])
          ]
        }
      }
    ];

    const estilos = {
      header: {
        fontSize: 20,
        bold: true,
      },
      bodyText: {
        fontSize: 12,
        bold: false,
      },
      tableHeader: {
        bold: true,
        fontSize: 16,
        fillColor: '#ff9900',
        color: '#eaff00',
      },
    };

    const documentDefinition = {
      content: contenido,
      styles: estilos
    };

    pdfMake.createPdf(documentDefinition).open();
  }
}

