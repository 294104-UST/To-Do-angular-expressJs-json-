import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { CompletedListComponent } from './completed-list/completed-list.component';

export const routes: Routes = [
    {path:"",component:ListTodoComponent},
    {path:"add",component:AddTodoComponent},
    {path:"completed",component:CompletedListComponent}
];
