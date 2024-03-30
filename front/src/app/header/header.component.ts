import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { KonectoiService } from '../services/konectoi.service';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  connected! : Boolean;

  constructor(public tokenService : TokenService, private authService : AuthService, private route : Router){}

  ngOnInit() : void {
    this.connected = this.tokenService.isLogged();
  }

  logOut() : void{
    this.tokenService.clearToken();
    this.route.navigateByUrl("/login");
  }
}
