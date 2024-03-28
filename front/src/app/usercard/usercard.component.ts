import { Component, Input, OnInit } from '@angular/core';
import { UserCard } from './usercard.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usercard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './usercard.component.html',
  styleUrl: './usercard.component.scss'
})
export class UsercardComponent implements OnInit{
  @Input() usercard! : UserCard;

  ngOnInit(): void {
  }

  testButton() : void{
    console.log("success");
  }
}
