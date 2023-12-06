import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { ChildComponent } from './child/child.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskListComponent } from './task-list/task-list.component';

@NgModule({
  declarations: [
    AppComponent,
    //ChildComponent,
    AddTaskComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    //AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
