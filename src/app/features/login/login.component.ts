import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  users: User[] = [];

  loginform=this.fb.group({
    username:['', [Validators.required]],
    password:[null, [Validators.required]]});
    
    constructor(private fb:FormBuilder, private loginService:LoginServiceService, private router:Router){}

    get username() { return this.loginform.get("username") }
    get password() { return this.loginform.get("password") }

    OnLogin(){
      this.loginService.login().subscribe(
        (users) => {
          this.users=users;
          const passwordControl: AbstractControl<string | null> | null = this.loginform.get("password");
          const password = passwordControl ? passwordControl.value : null;
          const foundUser = this.users.find(user => user.username === this.username?.value && user.password === password);
          
          if (foundUser) {
            alert("Thank You For Login");
            const username = this.username?.value || ""; 
            this.loginService.loggedintrue(username);
            this.router.navigateByUrl("/home");
          }else{
            alert("User Not Found Try Again");
            this.router.navigateByUrl("/login");
          }
        });}
      }

      interface User {
        username: string;
        password: string;
      }
            
      
    

      
    
  
