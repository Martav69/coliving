import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { noAuthGuard } from './guards/no-auth/no-auth.guard';
import { authGuard } from './guards/auth/auth.guard';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { InstantChatComponent } from './pages/instant-chat/instant-chat.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, },
    { path: 'connexion', component: LoginComponent, canActivate: [noAuthGuard]},
    { path: 'list-utilisateurs', canActivate:[authGuard], component: UsersListComponent},
    { path: 'conversation', canActivate:[authGuard], component: InstantChatComponent},
    { path: 'page-introuvable', component: NotFoundComponent},
    { path: '**', redirectTo: 'page-introuvable'}
];
