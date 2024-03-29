import { Component, OnDestroy, OnInit } from '@angular/core';
import { KonectoiService } from '../services/konectoi.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { UserCard } from '../usercard/usercard.model';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit, OnDestroy {

  loginForm! : FormGroup;
  loginSuccess : boolean = false;
  destroy$!: Subject<boolean>;
  currentUsercard! : UserCard;
  constructor(private konectoiService : KonectoiService, private formBuilder : FormBuilder , private router : Router){}

  ngOnInit() : void {
    this.destroy$ = new Subject<boolean>();
    this.loginForm = this.formBuilder.group({
      username : ["y", [Validators.required]],
      password : ["y", [Validators.required]]
    })
  }

   onSubmitLogin() : void{
    this.signIn();
  }

  signIn() : void {
    this.konectoiService.signIn(this.loginForm.value.username, this.loginForm.value.password)
    .pipe(
      takeUntil(this.destroy$),
      map((response : any) => {
        return response["user"]
    }))
    .subscribe( (currentusercard) =>{
      this.currentUsercard = currentusercard;
    }
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  


}
