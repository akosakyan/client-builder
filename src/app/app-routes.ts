import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'client-form'
  },
  {
    path: 'client-form',
    title: 'Client Form',
    loadChildren: () => import('./features/client-form/client-form-routes')
      .then((r) => r.CLIENT_FORM_ROUTES)
  },
  {
    path: 'created-client',
    title: 'Created Client',
    loadChildren: () => import('./features/created-client/created-client-routes')
      .then((r) => r.CREATED_CLIENT_ROUTES)
  }
];
