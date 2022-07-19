import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { AddressModel, ClientModel, IdentityVerificationModel } from '@app/models';
import { ClientCreateFormStepId, ClientData } from '@app/features/client-form/types';
import { MapperPipe, MapperPipeFn } from '@app/shared/pipes';
import { Telephone } from '@app/shared/components/telephone-input';

@Component({
  standalone: true,
  selector: 'app-created-client-page',
  templateUrl: './created-client-page.component.html',
  styleUrls: ['./created-client-page.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MapperPipe
  ]
})
export class CreatedClientPageComponent implements OnInit {
  client!: ClientModel;
  address!: AddressModel;
  identity!: IdentityVerificationModel;

  phoneNumberOneLinerFn: MapperPipeFn<Telephone, string> = (telephone: Telephone) => {
    const { area, exchange, subscriber } = telephone;

    return `${area}-${exchange}-${subscriber}`;
  }

  constructor(private router: Router) {
    const clientData = this._getClientDataFromRouterState();
    if (clientData) {
      this._setClientData(clientData);
    }
  }

  ngOnInit(): void {}

  private _getClientDataFromRouterState(): ClientData | undefined {
    return (
      this.router.getCurrentNavigation()?.extras?.state as { clientData: ClientData } | undefined
    )?.clientData;
  }

  private _setClientData(clientData: ClientData) {
    this.client = clientData[ClientCreateFormStepId.Client];
    this.address = clientData[ClientCreateFormStepId.Address];
    this.identity = clientData[ClientCreateFormStepId.Identity];
  }
}
