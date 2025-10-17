import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TodoService } from './service/todo.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Todo } from './Models/todoModel';
import { CompletedListComponent } from './completed-list/completed-list.component';
import { ListTodoComponent } from './list-todo/list-todo.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,JsonPipe,RouterLink,CompletedListComponent,ListTodoComponent,RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  constructor(public todoser:TodoService,private router:Router){}
 onLogout(){
  this.todoser.logOut()
  this.router.navigate(['/login'])
 }
}
