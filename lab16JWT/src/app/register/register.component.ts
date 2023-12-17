// register.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerData = {
    username: '',
    password: ''
  };

  confirmPassword = '';

  constructor(private auth: AuthService ) { }
  

  ngOnInit(): void {
  }

  register() {
    if (this.registerData.password !== this.confirmPassword) {
      // Las contraseñas no coinciden, puedes manejar esto mostrando un mensaje al usuario o tomando alguna acción
      console.log('Las contraseñas no coinciden');
      return; // Detener el registro si las contraseñas no coinciden
    }
    this.auth.register(this.registerData).subscribe(
      success => console.log('Registration Success'),
      err => console.error(err)
    );
  }
}

