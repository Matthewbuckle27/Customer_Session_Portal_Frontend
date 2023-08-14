import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  constructor(public service:LoginServiceService, private route:Router){}
  
  logOut(){
    this.service.logout();
    localStorage.clear();
    this.route.navigateByUrl("/login");
  }
  
}


