import { Component, OnDestroy, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-page.component.html',
  styleUrl: './update-page.component.scss'
})
export class UpdatePageComponent implements OnInit{

  usercard! : any;
  updateForm! : FormGroup;

  constructor(private tokenService : TokenService, private formBuilder : FormBuilder) {}

  ngOnInit(): void {
    this.usercard = this.tokenService.getInfoFromCurrentToken();

    this.updateForm = this.formBuilder.group({
      username : [this.usercard.username, [Validators.required]],
      password : [this.usercard.password, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      email : [this.usercard.email, [Validators.required, Validators.email]],
      birthdate : [this.usercard.birthdate, [Validators.required]],
      phonenumber : [this.usercard.phonenumber, [Validators.required, Validators.maxLength(10)]],
    })
  }
}
