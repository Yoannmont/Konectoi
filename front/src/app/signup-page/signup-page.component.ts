import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KonectoiService } from '../services/konectoi.service';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { UserCard } from '../usercard/usercard.model';
import {provideNativeDateAdapter} from '@angular/material/core';
import { UsercardComponent } from '../usercard/usercard.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, UsercardComponent],
  providers : [provideNativeDateAdapter()],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent implements OnInit, OnDestroy{
  signupForm! : FormGroup;
  usercardPreview$! : Observable<UserCard>;
  signUpSuccess : boolean = false;
  destroy$! : Subject<boolean>;
  
  constructor(public konectoiService : KonectoiService, private formBuilder : FormBuilder, private route : Router ){}
  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.signupForm = this.formBuilder.group({
      username : [null, [Validators.required]],
      password : [null, [Validators.required]],
      email : [null, [Validators.required, Validators.email]],
      birthdate : [null, [Validators.required]],
      phonenumber : [null, [Validators.required]],
    })

    this.usercardPreview$ = this.signupForm.valueChanges.pipe(
      map(formValue => ({...formValue}))
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
  onSubmitSignUp() : void{
    this.signUp();
  }

  signUp() :void{
    this.konectoiService.signUp(
      this.signupForm
      ).pipe(takeUntil(this.destroy$)).subscribe((string) =>{
        if(string.message ==="User signed up successfully!"){
          this.signUpSuccess = true;
          this.konectoiService.connected = true;
          this.route.navigateByUrl("/usercards");
        }
        console.log(string);
      }
)
  }

}
