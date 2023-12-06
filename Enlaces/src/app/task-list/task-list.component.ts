// task-list.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent {

  @Input() tasks: { name: string, createdDate: Date }[] = [];
  completedTasks: { name: string, completedDate: Date }[] = [];

  toggleTaskCompletion(index: number, isCompletedTask: boolean = false) {
    if (isCompletedTask) {
      const task = this.completedTasks[index];
      this.completedTasks.splice(index, 1);
      task.completedDate = new Date();
      this.tasks.push({ name: task.name, createdDate: task.completedDate });
    } else {
      const task = this.tasks[index];
      this.tasks.splice(index, 1);
      this.completedTasks.push({ name: task.name, completedDate: new Date() });
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  clearCompletedTasks() {
    this.completedTasks = [];
  }
}

