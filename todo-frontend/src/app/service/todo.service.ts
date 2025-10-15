import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { Todo } from '../Models/todoModel';
import { users } from '../Models/userModel';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl="http://localhost:8080/api/todo"
  constructor(private http:HttpClient) { }

  getAllTodo():Observable<Todo[]>{
    return this.http.get<Todo[]>(this.baseUrl);
  }

  getOneTodo(tid:number):Observable<Todo>{
    return this.http.get<Todo>(`${this.baseUrl}/${tid}`);
  }

  postTodo(tod:any):Observable<Todo>{
    return this.http.post<Todo>(`${this.baseUrl}/add`,tod);
  }

  delTodo(tid:number){
    console.log(`coonecting to url: ${this.baseUrl}/del/${tid}`)
    return this.http.delete(`${this.baseUrl}/del/${tid}`)
  }

  patchTodo(tid:number,stat:any){
    console.log(`the url from service is : ${this.baseUrl}/patch/${tid}`)
    return this.http.patch<string>(`${this.baseUrl}/patch/${tid}`,stat);
  }

  putTodo(tid:number,upTodo:Todo){
     console.log(`the url from service is : ${this.baseUrl}/put/${tid}`)
     return this.http.put<Todo>(`${this.baseUrl}/put/${tid}`,upTodo)
  }

  register(user:users):Observable<any>{
    console.log("the going user details: ",user)
    return this.http.post(`${this.baseUrl}/register`,user)
  }

  login(user:users):Observable<any>{
    console.log("the going user details: ",user)
    return this.http.post(`${this.baseUrl}/login`,user)
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }

  logOut(){
    localStorage.removeItem('token')
  }
}
