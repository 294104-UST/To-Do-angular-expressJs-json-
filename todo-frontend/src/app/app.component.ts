import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TodoService } from './service/todo.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todoModel';
import { CompletedListComponent } from './completed-list/completed-list.component';
import { ListTodoComponent } from './list-todo/list-todo.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,JsonPipe,RouterLink,CompletedListComponent,ListTodoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
 
}
