import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { Todo } from '../todoModel';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { filter, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-list-todo',
  imports: [CommonModule,RouterLink,ReactiveFormsModule,FormsModule],
  templateUrl: './list-todo.component.html',
  styleUrl: './list-todo.component.css'
})
export class ListTodoComponent implements OnInit {
  etodoForm:FormGroup;
  dataForEdit?:Todo;
constructor(private todoservice:TodoService,private fb:FormBuilder){
  this.etodoForm=fb.group({
      task:[""],
      status:[""],
      desc:[""],
      date:[""]
    });
}
  todoList:Todo[]=[]
  oneTodo?: Todo;
  viewClicked:boolean=false;
  //viewEdit:boolean=false;
  viewEdit:boolean=false;
  searchWord:string="";
  //searchedTodo$:Observable<Todo[]>=of([]);
  searchedTodo:Todo[]=[]
  upcomingTodos:Todo[]=[]
  
  ngOnInit(): void {
    this.loadData();
    this.upcomeTodo();
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
        this.upcomeTodo();
        });
        }

        else{
          this.todoservice.getAllTodo().subscribe(data => {
          this.todoList = data.filter(p=>p.status!='completed');
          this.upcomeTodo();
        });
        }
        // this.todoservice.getAllTodo().subscribe(data => {
        // this.todoList = data;
        // });      
    })
  }
  editTodo(tid:number){
    //this.viewEdit=true;
    this.viewEdit=!this.viewEdit;
    this.todoservice.getOneTodo(tid).subscribe(data=>{
      this.dataForEdit=data;
      this.etodoForm.patchValue({
        task: data.task,
        status: data.status,
        desc: data.desc,
        date: data.date
      });
    })
  }
  editHandle(tid:number){
    this.viewEdit=false;
    this.todoservice.putTodo(tid,this.etodoForm.value).subscribe(()=>{
          this.todoservice.getAllTodo().subscribe(data => {
          this.todoList = data.filter(p=>p.status!='completed');
        });
    })
  }

  //to handle search
  searchHandle(){
    console.log(this.searchWord);
    this.todoservice.getAllTodo().pipe(
      map(todos=>todos.filter(t=>t.task.includes(this.searchWord)))
    ).subscribe(data=>{
      if(this.searchWord==""){
        this.searchedTodo=[];
      }
      else{
        this.searchedTodo=data;
      }
    })
  }

  upcomeTodo(){
  const today = new Date();
  const fiveDaysLater = new Date();
  fiveDaysLater.setDate(today.getDate() + 5);
    this.todoservice.getAllTodo().pipe(
      map(tods=>tods.filter(td=>td.status!="completed"&&new Date(td.date)<=fiveDaysLater&& new Date(td.date)>=new Date()))
    ).subscribe(data=>{
        this.upcomingTodos=data;
        console.log(this.upcomingTodos);
    });  
      
  }
}
