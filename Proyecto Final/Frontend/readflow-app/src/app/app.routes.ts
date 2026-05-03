import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { TextosComponent } from './pages/textos/textos';
import { LeerComponent } from './pages/leer/leer';
import { PerfilComponent } from './pages/perfil/perfil';
import { LoginComponent } from './pages/login/login';
import { RegistroComponent } from './pages/registro/registro';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'textos', component: TextosComponent },
  { path: 'leer', component: LeerComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', redirectTo: '' }
];