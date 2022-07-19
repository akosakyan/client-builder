import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { ClientGroup, ClientModel } from '@app/models';
import { FormErrorMessagePipe } from '@app/shared/pipes';
import { TelephoneInputComponent } from '@app/shared/components/telephone-input';
import { ControlsOf } from '@app/features/client-form/types';

const imports: Component['imports'] = [
  CommonModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  FormErrorMessagePipe,
  TelephoneInputComponent
];

@Component({
  standalone: true,
  selector: 'app-client-details-form',
  imports,
  templateUrl: './client-details-form.component.html',
  styleUrls: [
    './client-details-form.component.scss',
    '../../client-form.scss',
  ],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ClientDetailsFormComponent implements  OnInit {
  @Input() detailsFormGroup!: FormGroup<ControlsOf<ClientModel>>;

  clientGroups: ClientGroup[] = Object.values(ClientGroup)

  coordinators: string[] = [
    'Jhones',
    'Colinwood',
    'Jim'
  ];

  dateOfBirthErrorMsgMap = {
    'date-minimum': 'You must be 18 years or older'
  };

  constructor() {}

  ngOnInit(): void {
    this.detailsFormGroup.controls.phoneNumber.statusChanges.subscribe(console.log);
  }
}
