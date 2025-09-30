import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { Todo } from '../todoModel';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-todo',
  imports: [CommonModule,RouterLink],
  templateUrl: './list-todo.component.html',
  styleUrl: './list-todo.component.css'
})
export class ListTodoComponent implements OnInit {
constructor(private todoservice:TodoService){}
  todoList:Todo[]=[]
  oneTodo?: Todo;
  viewClicked:boolean=false;
  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.todoservice.getAllTodo().subscribe(data=>{
      console.log("the data is :",data);
      this.todoList=data.filter(p=>p.status!='completed')
    });
  }
  viewTodo(tid:number){
    this.viewClicked=true;
    this.todoservice.getOneTodo(tid).subscribe(data=>{
      this.oneTodo=data
    })
  }
  viewClose(){
    this.viewClicked=false;
  }

  deleteTodo(tid:number){
    console.log('deleting id is : ',tid)
    this.todoservice.delTodo(tid).subscribe(()=>{
      this.todoservice.getAllTodo().subscribe(data => {
      this.todoList = data.filter(p=>p.status!='completed');
    });
    });
  }

  statusUpdate(tid:number,stat:any){
    console.log(`the clicked id : ${tid} and the status to be updated is : ${stat}`)
    this.todoservice.patchTodo(tid,{status:stat}).subscribe(()=>{

        if(stat=='completed'){
          this.todoservice.getAllTodo().subscribe(data => {
        this.todoList = data.filter(p=>p.status!='completed');
        });
        }

        else{
          this.todoservice.getAllTodo().subscribe(data => {
          this.todoList = data.filter(p=>p.status!='completed');
        });
        }
        // this.todoservice.getAllTodo().subscribe(data => {
        // this.todoList = data;
        // });      
    })
  }
}
