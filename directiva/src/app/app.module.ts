
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MiDirectivaDirective } from './mi-directiva.directive';
import { FormularioComponent } from './formulario/formulario.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListuserComponent } from './listuser/listuser.component';

import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    MiDirectivaDirective,
    FormularioComponent,
    RegisteruserComponent,
    ListuserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
    //AppRoutingModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
