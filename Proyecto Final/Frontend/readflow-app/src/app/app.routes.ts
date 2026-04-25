import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { TextosComponent } from './pages/textos/textos';
import { LeerComponent } from './pages/leer/leer';
import { PerfilComponent } from './pages/perfil/perfil';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'textos', component: TextosComponent },
  { path: 'leer/:id', component: LeerComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: '**', redirectTo: '' }
];