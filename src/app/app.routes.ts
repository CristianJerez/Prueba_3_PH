import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'precio-modal',
    loadComponent: () => import('./pagina/precio-modal/precio-modal.page').then( m => m.PrecioModalPage)
  },
];
