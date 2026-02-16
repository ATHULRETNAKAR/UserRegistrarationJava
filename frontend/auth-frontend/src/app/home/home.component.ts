import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:[RouterModule, CommonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  welcomeMessage:string="";

  constructor(private router:Router, private api:ApiService){}

  ngOnInit(){
    const token = localStorage.getItem("token");

    if(!token){
      this.router.navigate(['/login']);
      return;
    }

    this.api.home(token).subscribe({
      next:(res:any)=>{
        this.welcomeMessage = res;
      },
      error:()=>{
        this.welcomeMessage = "Error loading user";
      }
    });
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
}
