import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Todo } from '../Models/todoModel';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoService } from '../service/todo.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent implements OnInit{
  //@Output() addTodo=new EventEmitter<Todo>();
  allTodos:Todo[]=[];
  counter: any;
  ngOnInit(): void {
    this.loadAllTodo();
  }
  loadAllTodo() {
   this.todoservice.getAllTodo().subscribe(data=>{
      this.allTodos=data;
      this.counter=this.allTodos.length;
   });
  }

  todoForm:FormGroup;
  constructor(private fb:FormBuilder,private todoservice:TodoService,private router:Router){
    this.todoForm=fb.group({
      task:["",Validators.required],
      status:["pending",Validators.required],
      desc:["",Validators.required],
      date:[""]
    });
  }

  submitHandle(){
    console.log("all todos are : ",this.counter)
    console.log('clicked/n',{id:++this.counter,...this.todoForm.value})
    this.todoservice.postTodo({id:String(this.counter),...this.todoForm.value}).subscribe();
    //this.addTodo.emit();
    this.todoForm.reset();
    this.router.navigate(['/']);
  }
}

