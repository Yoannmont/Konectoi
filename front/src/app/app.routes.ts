import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { UsercardListComponent } from './usercard-list/usercard-list.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { AuthGuard } from './guards/auth.guard';
import { UpdatePageComponent } from './update-page/update-page.component';
import { LoadingComponent } from './loading/loading.component';

export const routes: Routes = [
    {path:'login', component: LoginPageComponent},
    {path: 'usercards', component: UsercardListComponent, canActivate : [AuthGuard]},
    {path :'', redirectTo:'/login', pathMatch:'full'},
    {path:'signup', component:SignupPageComponent},
    {path:'update', component:UpdatePageComponent, canActivate : [AuthGuard]},
    // {path : 'test', component: LoadingComponent}
];
