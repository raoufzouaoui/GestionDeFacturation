import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  returnUrl = '';
  loginForm!:FormGroup;
  isSubmitted= false;
  constructor(private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private userService:UserService,private router:Router){
        this.loginForm = this.formBuilder.group({
          email:['',[Validators.required,Validators.email]],
          password:['',Validators.required]
        });

        this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc(){
    return this.loginForm.controls;
  }

  login(){
    this.isSubmitted=true;
    if(this.loginForm.invalid) return;

    this.userService.login({email:this.fc.email.value,password:this.fc.password.value}).subscribe(() => {
        this.router.navigateByUrl(this.returnUrl);
    })
  }

}
