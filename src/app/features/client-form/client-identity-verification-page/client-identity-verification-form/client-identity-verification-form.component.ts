import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { DocumentType, IdentityVerificationModel } from '@app/models';
import { FormErrorMessagePipe } from '@app/shared/pipes';
import { FileUploaderComponent } from '@app/shared/components/file-uploader';
import { ControlsOf } from '@app/features/client-form/types';

const imports: Component['imports'] = [
  CommonModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDatepickerModule,
  FormErrorMessagePipe,
  FileUploaderComponent
];

@Component({
  selector: 'app-client-identity-verification-form',
  standalone: true,
  imports,
  templateUrl: './client-identity-verification-form.component.html',
  styleUrls: [
    './client-identity-verification-form.component.scss',
    '../../client-form.scss',
  ]
})
export class ClientIdentityVerificationFormComponent implements OnInit {
  @Input() identityFormGroup!: FormGroup<ControlsOf<IdentityVerificationModel>>;

  documentTypes: DocumentType[] = Object.values(DocumentType);

  constructor() { }

  ngOnInit(): void {}

  onImageFileChange(event: File | null): void {
    this.identityFormGroup.controls.file.setValue(event);
  }
}
