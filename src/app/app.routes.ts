import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Home } from './features/feed/home/home';
import { Profile } from './features/profile/profile/profile';
import { authGuard } from './core/auth/auth-guard';
import { guestGuard } from './core/auth/guest-guard';

export const routes: Routes = [
    { path: '', component: Login, pathMatch: 'full' },
    { path: 'login', component: Login, canActivate: [guestGuard] },
    { path: 'register', component: Register, canActivate: [guestGuard] },
    { path: 'home', component: Home, canActivate: [authGuard] },
    { path: 'profile', component: Profile, canActivate: [authGuard] },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
];
