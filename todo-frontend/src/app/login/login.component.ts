import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../service/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  logForm:FormGroup;
  constructor(private fb:FormBuilder,private todoservice:TodoService,private router:Router){
    this.logForm=fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  onSubmit(){
    console.log('the form data is : ',this.logForm.value)
    this.todoservice.login(this.logForm.value).subscribe(data=>{
      console.log("Successfully registered!!");
      localStorage.setItem('token',data.token)
      this.logForm.reset()
      this.router.navigate(['/'])
    });
  }
}
