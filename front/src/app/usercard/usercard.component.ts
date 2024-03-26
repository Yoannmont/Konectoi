import { Component, Input, OnInit } from '@angular/core';
import { UserCard } from './usercard.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usercard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usercard.component.html',
  styleUrl: './usercard.component.css'
})
export class UsercardComponent implements OnInit{
  @Input() usercard! : UserCard;

  ngOnInit(): void {
  }
}
