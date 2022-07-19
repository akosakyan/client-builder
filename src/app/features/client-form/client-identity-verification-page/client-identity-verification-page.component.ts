import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { ClientFormService } from '../client-form.service';
import { ClientIdentityVerificationFormComponent } from './client-identity-verification-form/client-identity-verification-form.component';

@Component({
  selector: 'app-client-identity-verification-page',
  standalone: true,
  imports: [
    CommonModule,
    ClientIdentityVerificationFormComponent
  ],
  templateUrl: './client-identity-verification-page.component.html',
  styleUrls: [
    './client-identity-verification-page.component.scss',
    '../client-form-step-page.scss'
  ]
})
export class ClientIdentityVerificationPageComponent implements OnInit {

  identityFormGroup: FormGroup = this.clientFormService.getClientIdentityForm();

  constructor(private clientFormService: ClientFormService) { }

  ngOnInit(): void {}

}
