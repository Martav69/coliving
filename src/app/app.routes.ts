import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { noAuthGuard } from './guards/no-auth/no-auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, },
    { path: 'connexion', component: LoginComponent, canActivate: [noAuthGuard]},
    { path: 'page-introuvable', component: NotFoundComponent},
    { path: '**', redirectTo: 'page-introuvable'}
];
