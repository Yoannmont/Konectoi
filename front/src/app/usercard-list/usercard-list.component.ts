import { Component, OnInit } from '@angular/core';
import { UsercardComponent } from '../usercard/usercard.component';
import { UserCard } from '../usercard/usercard.model';
import { KonectoiService } from '../services/konectoi.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usercard-list',
  standalone: true,
  imports: [UsercardComponent, CommonModule],
  templateUrl: './usercard-list.component.html',
  styleUrl: './usercard-list.component.css'
})
export class UsercardListComponent implements OnInit{

  usercards! : UserCard[];
  constructor(private konectoiService : KonectoiService){};
  ngOnInit() : void {
    this.usercards = this.konectoiService.getAllUserCards();
  }
}
