import { Routes } from '@angular/router';

import { HasClientDataGuard } from './has-client-data.guard';

export const CREATED_CLIENT_ROUTES: Routes = [
  {
    path: '',
    canActivate: [HasClientDataGuard],
    loadComponent: () => import('./created-client-page/created-client-page.component')
      .then((r) => r.CreatedClientPageComponent)
  }
];
