import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { ClientFormService } from '../client-form.service';
import { ClientDetailsFormComponent } from './client-details-form/client-details-form.component';

@Component({
  standalone: true,
  selector: 'app-client-details-page',
  imports: [
    CommonModule,
    ClientDetailsFormComponent,
  ],
  templateUrl: './client-details-page.component.html',
  styleUrls: [
    './client-details-page.component.scss',
    '../client-form-step-page.scss'
  ]
})
export class ClientDetailsPageComponent implements OnInit {

  detailsFormGroup: FormGroup = this.clientFormService.getClientDetailsForm();

  constructor(private clientFormService: ClientFormService) {}

  ngOnInit(): void {}

}
