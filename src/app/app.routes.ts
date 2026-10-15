import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Home } from './features/feed/home/home';
import { Profile } from './features/profile/profile/profile';
import { authGuard } from './core/auth/auth-guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'home', component: Home },
    { path: 'profile', component: Profile, canActivate: [authGuard] },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
];
