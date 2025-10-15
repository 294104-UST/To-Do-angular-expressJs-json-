import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { CompletedListComponent } from './completed-list/completed-list.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path:"",component:ListTodoComponent,canActivate: [authGuard]},
    {path:"add",component:AddTodoComponent,canActivate: [authGuard]},
    {path:"completed",component:CompletedListComponent,canActivate: [authGuard]},
    {path:"login",component:LoginComponent},
    {path:"register",component:RegistrationComponent}
];
