import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../todoModel';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-completed-list',
  imports: [CommonModule],
  templateUrl: './completed-list.component.html',
  styleUrl: './completed-list.component.css'
})
export class CompletedListComponent implements OnInit{
  completedTodo:Todo[]=[];
  ngOnInit(): void {
    this.loadCompleted();
  }
  constructor(private todoservice:TodoService){}
  loadCompleted(){
    this.todoservice.getAllTodo().subscribe(data=>{
      this.completedTodo=data.filter(p=>p.status=="completed");
    })
  }
}
