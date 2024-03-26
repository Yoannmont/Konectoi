import { Component, OnInit } from '@angular/core';
import { KonectoiService } from '../services/konectoi.service';
import { UpperCasePipe } from '@angular/common';
import { UsercardComponent } from '../usercard/usercard.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [UpperCasePipe, UsercardComponent, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {

  loginForm! : FormGroup;
  constructor(public konectoiService : KonectoiService, private formBuilder : FormBuilder ){}

  ngOnInit() : void {
    this.loginForm = this.formBuilder.group({
      name : [null],
      surname : [null],
      email : [null],
      creationDate : [null],
      phoneNumber : [null]
    })
  }


}
