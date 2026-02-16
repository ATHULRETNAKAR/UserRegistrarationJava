import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports:[FormsModule, RouterModule, CommonModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  name:string="";
  phone:string="";
  email:string="";
  password:string="";
  confirmPassword:string="";


  showPassword:boolean=false;
  loading:boolean=false;
  toastMessage:string="";

  constructor(private api:ApiService, private router:Router){}

  togglePassword(){
    this.showPassword = !this.showPassword;
  }

  showToast(msg:string){
    this.toastMessage = msg;
    setTimeout(()=> this.toastMessage="", 3000);
  }

  registerUser(){

    if(!this.name || !this.phone || !this.email || !this.password || !this.confirmPassword){
      this.showToast("All fields are required");
      return;
    }
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if(!emailPattern.test(this.email)){
      this.showToast("Enter valid email address ❌");
      return;
    }
  
    if(this.password !== this.confirmPassword){
      this.showToast("Passwords do not match ❌");
      return;
    }
  
    if(this.password.length < 6){
      this.showToast("Password must be at least 6 characters");
      return;
    }
  
    this.loading = true;
  
    this.api.register(this.name, this.phone, this.email, this.password).subscribe({
      next:(res:any)=>{
        this.loading = false;
  
        this.showToast(res.message || "Registration successful 🎉");
  
        setTimeout(()=>{
          this.router.navigate(['/login']);
        },1000);
      },
  
      error:(err)=>{
        this.loading = false;
  
        if(err.error?.message){
          this.showToast(err.error.message);
        }else{
          this.showToast("Registration failed ❌");
        }
      }
    });
  }
  
  
}
