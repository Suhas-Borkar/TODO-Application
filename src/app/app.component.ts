import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todoApp';
  taskInput:any = '';

  taskList:any = [];
  allTasks:any = []; // Store original tasks
  currentFilter: string = 'all'; // Track current filter
  

  addTask() {
      if(this.taskInput.trim() === '') 
      {
        alert('Task is required');
        return;
      }  
      else{
      let task:any = {
        id: this.allTasks.length + 1,
        title: this.taskInput,
        status: 'pending'
      }
      this.allTasks.push(task);
      this.applyFilter(); // Apply filter to update taskList
      console.log(this.taskList);
      this.taskInput = '';
    }
  }

  filterTasks(filter:any){
    this.currentFilter = filter;
    this.applyFilter();
  }

  applyFilter() {
    if(this.currentFilter === 'all'){
      this.taskList = [...this.allTasks];
    }
    else if(this.currentFilter === 'pending'){
      this.taskList = this.allTasks.filter((task:any) => task.status === 'pending');
    }
    else if(this.currentFilter === 'completed'){
      this.taskList = this.allTasks.filter((task:any) => task.status === 'completed');
    }
    console.log(this.taskList);
  }
  completeTask(id:any){
    this.allTasks = this.allTasks.map((task:any) => task.id === id ? { ...task, status: 'completed' } : task);
    this.applyFilter();
    console.log(this.taskList);
  }

  deleteTask(id:any){
    this.allTasks = this.allTasks.filter((task:any) => task.id !== id);
    this.applyFilter();
    console.log(this.taskList);
  }
}
