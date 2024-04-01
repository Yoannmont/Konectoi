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
  destroy$! : Subject<boolean>;
  
  constructor(public konectoiService : KonectoiService, private formBuilder : FormBuilder, private route : Router ){}
  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.signupForm = this.formBuilder.group({
      username : ['', [Validators.required]],
      password : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      email : ['', [Validators.required, Validators.email]],
      birthdate : ['', [Validators.required]],
      phonenumber : ['', [Validators.required, Validators.maxLength(10)]],
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
      ).pipe(takeUntil(this.destroy$)).subscribe(() =>{
        this.route.navigateByUrl('/login');
      }
)
  }

}
