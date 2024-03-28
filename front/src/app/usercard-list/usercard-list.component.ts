import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsercardComponent } from '../usercard/usercard.component';
import { UserCard } from '../usercard/usercard.model';
import { KonectoiService } from '../services/konectoi.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-usercard-list',
  standalone: true,
  imports: [UsercardComponent, CommonModule],
  templateUrl: './usercard-list.component.html',
  styleUrl: './usercard-list.component.scss'
})
export class UsercardListComponent implements OnInit, OnDestroy{

  usercards! : UserCard[];
  private destroy$! : Subject<boolean>;
  constructor(private konectoiService : KonectoiService){};
  ngOnInit() : void {
    this.destroy$ = new Subject<boolean>();
    this.getUsers();
  }

  public getUsers() : void {
    this.konectoiService.getAllUsers().pipe(takeUntil(this.destroy$)).subscribe((usercards : any) =>{
     this.usercards = usercards["AllUser"];}
     );
  
  
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
