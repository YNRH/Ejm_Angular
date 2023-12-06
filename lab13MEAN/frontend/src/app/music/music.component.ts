import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MusicService } from '../music.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css'],
})
export class MusicComponent implements OnInit {
  musicList: any[] = [];
  currentSong: any = {};

  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;

  constructor(private musicService: MusicService) {}

  songToDeleteId: string | null = null;

  ngOnInit(): void {
    this.getMusic();
  }

  getMusic(): void {
    this.musicService.getMusic().subscribe((music) => {
      this.musicList = music;
    });
  }

  cargarArchivo(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.currentSong.audioFile = file;
      if (this.audioPlayerRef) {
        const audioPlayer = this.audioPlayerRef.nativeElement;
        audioPlayer.pause();
        audioPlayer.src = URL.createObjectURL(file);
        audioPlayer.load();
        audioPlayer.onloadedmetadata = () => {
          audioPlayer.play();
        };
      }
    }
  }

  getMusicById(id: string): void {
    this.musicService.getMusicById(id).subscribe((song) => {
      this.currentSong = song;
    });
  }

  createMusic(music: any): void {
    const formData = new FormData();
    formData.append('title', music.title);
    formData.append('artist', music.artist);
    formData.append('genre', music.genre);
    formData.append('audio', music.audioFile); // Asegúrate de que 'audio' coincida con el nombre esperado en el backend

    this.musicService.uploadMusic(formData).subscribe((response) => {
      console.log('Response from uploadMusic:', response);
      music.audioPath = response.audioPath;

      // Elimina el campo audioPath antes de enviar la solicitud al servidor
      const { audioPath, ...musicWithoutAudioPath } = music;

      this.musicService.createMusic(musicWithoutAudioPath).subscribe(() => {
        this.getMusic();
        this.currentSong = {};
        alert('¡Canción agregada exitosamente!');
      });
    });
  }

  updateMusic(id: string, music: any): void {
    this.musicService.updateMusic(id, music).subscribe(() => {
      this.getMusic();
      this.currentSong = {};
      alert('¡Canción actualizada exitosamente!');
    });
  }

  deleteMusic(id: string): void {
    this.musicService.deleteMusic(id).subscribe(() => {
      this.getMusic();
    });
  }

  editMusic(id: string): void {
    this.musicService.getMusicById(id).subscribe((song) => {
      this.currentSong = song;
      const audioPlayer = this.audioPlayerRef.nativeElement;
      audioPlayer.src = song.audioPath;
      audioPlayer.load();
      audioPlayer.play();
    });
  }

  confirmDeleteMusic(id: string): void {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta canción?');
    if (confirmed) {
      this.deleteMusic(id);
    }
  }
  
}
