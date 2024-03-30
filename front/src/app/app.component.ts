import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HeaderComponent } from './header/header.component';
import {MdbCheckboxModule} from 'mdb-angular-ui-kit/checkbox'
import { LoadingComponent } from './loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginPageComponent, HeaderComponent, MdbCheckboxModule, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'Konectoi';
}
