import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service'; 

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent {
  miFormulario: FormGroup;
  nombre: string = '';
  email: string = '';
  password: string = '';

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.miFormulario = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/),]],
    });
  }

  onSubmit() {
    if (window.confirm('¿Estás seguro de que deseas enviar el formulario?')) {
      const userData = this.miFormulario.value;
      this.userService.addUser(userData.nombre); 
      this.router.navigate(['/listar-usuarios']);
    }
  }
}
