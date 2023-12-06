import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private apiUrl = 'http://localhost:3000/api/music';

  constructor(private http: HttpClient) { }

  getMusic() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getMusicById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url);
  }

  createMusic(music: any): Observable<any> {
    return this.http.post(this.apiUrl, music);
  }

  updateMusic(id: string, music: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, music);
  }

  deleteMusic(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  // Función para subir archivo de música al servidor
  uploadMusic(formData: FormData): Observable<any> {
    const uploadUrl = `${this.apiUrl}/upload`; // Ruta para subir archivos
    return this.http.post(uploadUrl, formData);
  }
  
}
