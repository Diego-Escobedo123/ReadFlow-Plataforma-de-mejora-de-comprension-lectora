import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { TextosComponent } from './pages/textos/textos';
import { LeerComponent } from './pages/leer/leer';
import { PerfilComponent } from './pages/perfil/perfil';
import { LoginComponent } from './pages/login/login';
import { RegistroComponent } from './pages/registro/registro';
import { AnalizarComponent } from './pages/analizar/analizar';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'textos', component: TextosComponent, canActivate: [authGuard] },
  { path: 'leer/:id', component: LeerComponent, canActivate: [authGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'analizar', component: AnalizarComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' }
];