import { Component, OnInit } from '@angular/core';
import { KonectoiService } from '../services/konectoi.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  loginForm! : FormGroup;
  loginSuccess : boolean = false;
  
  constructor(private konectoiService : KonectoiService, private formBuilder : FormBuilder , private router : Router){}

  ngOnInit() : void {
    this.loginForm = this.formBuilder.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    })

    
  }

   onSubmitLogin() : void{
    console.log(this.loginForm.value);
  }

  


}
