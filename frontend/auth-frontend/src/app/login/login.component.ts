import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email:string="";
  password:string="";

  showPassword:boolean=false;
  loading:boolean=false;
  toastMessage:string="";

  constructor(private api:ApiService, private router:Router){}

  togglePassword(){
    this.showPassword = !this.showPassword;
  }

  showToast(msg:string){
    this.toastMessage = msg;
    setTimeout(()=> this.toastMessage="",3000);
  }

  loginUser(){
    console.log("Button clicked");
    if(!this.email || !this.password){
      this.showToast("Enter email & password");
      return;
    }

    this.loading = true;

    this.api.login(this.email,this.password).subscribe({
      next:(res:any)=>{
        this.loading=false;

        this.showToast(res.message || "Login success 🔥");

        if(res.token){
          localStorage.setItem("token",res.token);
        }

        setTimeout(()=>{
          this.router.navigate(['/home']);
        },1000);
      },

      error:(err)=>{
        this.loading=false;

        if(err.error?.message){
          this.showToast(err.error.message);
        }else{
          this.showToast("Login failed ❌");
        }
      }
    });
  }
}
