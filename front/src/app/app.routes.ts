import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { UsercardListComponent } from './usercard-list/usercard-list.component';

export const routes: Routes = [
    {path:'login', component: LoginPageComponent},
    {path: 'usercards', component: UsercardListComponent},
    {path :'', redirectTo:'/login', pathMatch:'full'}
];
