import { Component, OnInit } from '@angular/core';
import { KonectoiService } from '../services/konectoi.service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  name! : string;
  number! : number;
  constructor(public konectoiService : KonectoiService){}

  ngOnInit() : void {
    this.name = this.konectoiService.name;
  }

  onClick(): void {
    this.konectoiService.number++;
  }

}
