import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ClientFormStepperContainerPageComponent, } from './client-form-stepper-container-page/client-form-stepper-container-page.component';
import { ClientCreateFormStepId, IClientCreateFormStepRouteData } from './types';
import { CanAccessStepGuard } from './can-access-step.guard';
import { ClientFormService } from './client-form.service';

export const CLIENT_FORM_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'client'
  },
  {
    path: '',
    providers: [
      importProvidersFrom(ReactiveFormsModule),
      ClientFormService,
      CanAccessStepGuard
    ],
    component: ClientFormStepperContainerPageComponent,
    children: [
      {
        path: 'client',
        title: 'Client Details',
        data: { stepId: ClientCreateFormStepId.Client, stepLabel: 'Client Details' } as IClientCreateFormStepRouteData,
        canActivate: [CanAccessStepGuard],
        loadComponent: () => import('./client-details-page/client-details-page.component')
          .then((r) => r.ClientDetailsPageComponent)
      },
      {
        path: 'address',
        title: 'Client Address',
        data: {
          stepId: ClientCreateFormStepId.Address,
          stepLabel: 'Client Address'
        } as IClientCreateFormStepRouteData,
        canActivate: [CanAccessStepGuard],
        loadComponent: () => import('./client-address-page/client-address-page.component')
          .then((r) => r.ClientAddressPageComponent)
      },
      {
        path: 'identity',
        title: 'Client Identity',
        data: {
          stepId: ClientCreateFormStepId.Identity,
          stepLabel: 'Client Identity Verification',
        } as IClientCreateFormStepRouteData,
        canActivate: [CanAccessStepGuard],
        loadComponent: () => import('./client-identity-verification-page/client-identity-verification-page.component')
          .then((r) => r.ClientIdentityVerificationPageComponent)
      }
    ]
  },
  {
    path: 'complete',
    title: 'Client Create Complete',
    loadComponent: () => import('./client-create-success-page/client-create-success-page.component')
      .then((r) => r.ClientCreateSuccessPageComponent)
  }
];
