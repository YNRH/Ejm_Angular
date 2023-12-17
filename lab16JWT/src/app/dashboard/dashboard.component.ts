// dashboard.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  countdownDate: Date = new Date('December 25, 2023 00:00:00'); // Fecha de Navidad
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  private countdownSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.updateCountdown();
    // Actualiza la cuenta regresiva cada segundo
    this.countdownSubscription = interval(1000).subscribe(() => {
      this.updateCountdown();
    });
  }

  ngOnDestroy(): void {
    // Detiene la suscripción al destruir el componente para evitar fugas de memoria
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  updateCountdown(): void {
    const currentTime: Date = new Date();
    const difference: number = this.countdownDate.getTime() - currentTime.getTime();

    this.days = Math.floor(difference / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((difference % (1000 * 60)) / 1000);
  }
}
