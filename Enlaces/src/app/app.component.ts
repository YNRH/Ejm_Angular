
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: { name: string, createdDate: Date }[] = [];

  addTask(taskName: string) {
    const newTask = { name: taskName, createdDate: new Date() };
    this.tasks.push(newTask);
  }

}
