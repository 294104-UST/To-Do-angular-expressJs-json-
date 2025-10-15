import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../service/todo.service';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  regForm:FormGroup;
  constructor(private fb:FormBuilder,private todoservice:TodoService,private router:Router){
    this.regForm=fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  onSubmit(){
    console.log('the form data is : ',this.regForm.value)
    this.todoservice.register(this.regForm.value).subscribe();
    console.log("Successfully registered!!")
    this.regForm.reset()
    this.router.navigate(['/login'])
  }
}
