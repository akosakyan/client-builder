import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { ClientData } from '@app/features/client-form/types';

@Injectable({
  providedIn: 'root'
})
export class HasClientDataGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this._getClientDataFromRouterState()) {
      return true;
    }

    return this.router.createUrlTree(['/client-form']);
  }

  private _getClientDataFromRouterState(): ClientData | undefined {
    return (
      this.router.getCurrentNavigation()?.extras?.state as { clientData: ClientData } | undefined
    )?.clientData;
  }
  
}
