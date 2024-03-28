import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { KonectoiService } from '../services/konectoi.service';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  connected! : boolean;

  constructor(private konectoiService : KonectoiService, private router: Router){}

  ngOnInit() : void {
    this.connected = this.konectoiService.connected;
  }

  logOut() : void{
    this.router.navigateByUrl('/login')
  }
}
