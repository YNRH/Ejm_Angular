// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  login(): void {
    // Lógica de inicio de sesión, por ejemplo, cambiar isAuthenticated a true después de autenticar al usuario
    this.isAuthenticated = true;
  }

  logout(): void {
    // Lógica de cierre de sesión, por ejemplo, cambiar isAuthenticated a false al salir de la sesión
    this.isAuthenticated = false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
