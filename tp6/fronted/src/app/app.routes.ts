import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Route pour la connexion
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirection par défaut vers /login
  { path: '**', redirectTo: '/login' }, // Redirection pour les routes non reconnues
];
