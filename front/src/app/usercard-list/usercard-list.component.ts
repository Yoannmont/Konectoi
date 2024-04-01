import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsercardComponent } from '../usercard/usercard.component';
import { UserCard } from '../usercard/usercard.model';
import { KonectoiService } from '../services/konectoi.service';
import { CommonModule } from '@angular/common';
import { Observable, Subject, filter, map, takeUntil } from 'rxjs';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-usercard-list',
  standalone: true,
  imports: [UsercardComponent, CommonModule],
  templateUrl: './usercard-list.component.html',
  styleUrl: './usercard-list.component.scss'
})
export class UsercardListComponent implements OnInit, OnDestroy{

  usercards$! : Observable<UserCard[]>;
  private destroy$! : Subject<boolean>;
  constructor(private konectoiService : KonectoiService, private tokenService : TokenService){};
  ngOnInit() : void {
    this.destroy$ = new Subject<boolean>();
    this.getUsers();
  }

  public getUsers() : void {
    this.usercards$ = this.konectoiService.getAllUsers().pipe(
      takeUntil(this.destroy$),
      map((response : any) => {
        return response['AllUser']}),
        map((usercards : UserCard[])  => {
          return usercards.filter((usercard : UserCard) => usercard.id !== this.tokenService.getInfoFromCurrentToken().user_id)
        }),
    )

  
  
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
