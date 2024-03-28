import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { KonectoiService } from '../services/konectoi.service';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { UserCard } from '../usercard/usercard.model';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, MatDatepickerModule, MatInputModule],
  providers : [provideNativeDateAdapter()],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent implements OnInit, OnDestroy{
  signupForm! : FormGroup;
  usercardPreview$! : Observable<UserCard>;
  signUpSuccess : boolean = false;
  destroy$! : Subject<boolean>;
  
  constructor(public konectoiService : KonectoiService, private formBuilder : FormBuilder ){}
  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.signupForm = this.formBuilder.group({
      username : [null],
      password : [null],
      email : [null],
      birthdate : ['01-01-2000'],
      phonenumber : [null]
    })

    this.usercardPreview$ = this.signupForm.valueChanges.pipe(
      map(formValue => ({...formValue}))
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
  onSubmitSignUp() : void{
    console.log(this.signupForm.value);
    this.signUp();
  }

  signUp() :void{
    this.konectoiService.signUp(this.signupForm.value).pipe(takeUntil(this.destroy$)).subscribe()
  }

}
