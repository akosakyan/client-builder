import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, Routes, UrlTree } from '@angular/router';

import { ClientFormService } from './client-form.service';
import { IClientCreateFormStepRouteData } from './types';

@Injectable()
export class CanAccessStepGuard implements CanActivate {

  constructor(
    private clientFormService: ClientFormService,
    private router: Router
  ) {}

  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    routerStateSnapshot: RouterStateSnapshot
  ): boolean | UrlTree {
    const stepperRoutes = activatedRouteSnapshot.parent?.routeConfig?.children as Routes;

    const stepIndex = stepperRoutes.findIndex((route) =>
      (route.data as IClientCreateFormStepRouteData).stepId === (activatedRouteSnapshot.data as IClientCreateFormStepRouteData).stepId
    );

    const previousStepsIsValid = stepperRoutes
      .slice(0, stepIndex)
      .map(({ data }) => this.clientFormService.getClientStepFormById((data as IClientCreateFormStepRouteData).stepId))
      .every((formGroup) => formGroup.valid);

    if (previousStepsIsValid) {
      return true;
    }

    // TODO: find last valid state, and navigate to it
    // const lastValidStep = stepperRoutes
    //   .map(({ data }) => this.clientFormService.getClientStepFormById((data as IClientCreateFormStepRouteData).stepId))

    return this.router.createUrlTree(['/client-form/client']);
  }

}
