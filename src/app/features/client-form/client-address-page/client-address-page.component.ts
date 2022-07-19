import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientAddressFormComponent } from './client-address-form/client-address-form.component';
import { FormGroup } from '@angular/forms';
import { ClientFormService } from '@app/features/client-form/client-form.service';

@Component({
  selector: 'app-client-address-page',
  standalone: true,
  imports: [
    CommonModule,
    ClientAddressFormComponent
  ],
  templateUrl: './client-address-page.component.html',
  styleUrls: [
    './client-address-page.component.scss',
    '../client-form-step-page.scss'
  ]
})
export class ClientAddressPageComponent implements OnInit {

  addressFormGroup: FormGroup = this.clientFormService.getClientAddressForm();

  constructor(private clientFormService: ClientFormService) {}

  ngOnInit(): void {}

}
