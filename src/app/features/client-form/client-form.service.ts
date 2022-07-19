import { Injectable } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

import { subYears } from 'date-fns';

import { ClientCreateFormStepId, ClientData, ClientDataForm } from './types';
import { ClientFormValidators } from './client-form.validators';

@Injectable()
export class ClientFormService {
  private _clientForm!: FormGroup<ClientDataForm>;

  constructor(private fb: NonNullableFormBuilder) {
    this._clientForm = this.createClientForm();
  }

  getForm(): FormGroup {
    return this._clientForm;
  }

  getClientStepFormById(id: ClientCreateFormStepId): FormGroup {
    return  this._clientForm.get(id) as FormGroup;
  }

  getClientDetailsForm(): FormGroup {
    return this._clientForm.get(ClientCreateFormStepId.Client) as FormGroup;
  }

  getClientAddressForm(): FormGroup {
    return this._clientForm.get(ClientCreateFormStepId.Address) as FormGroup;
  }

  getClientIdentityForm(): FormGroup {
    return this._clientForm.get(ClientCreateFormStepId.Identity) as FormGroup;
  }

  reset() {
    this._clientForm.reset();
  }

  getValue(): ClientData {
    return this._clientForm.getRawValue() as ClientData;
  }

  private createClientForm(): FormGroup<ClientDataForm> {
    return this.fb.group<ClientDataForm>({
      [ClientCreateFormStepId.Client]: this.fb.group({
        lastName: this.fb.control('', [Validators.required]),
        name: this.fb.control('', [Validators.required]),
        middleName: this.fb.control(''),
        dateOfBirth: this.fb.control(null, [
          Validators.required,
          ClientFormValidators.dateMinimum(subYears(new Date(), 18))]
        ),
        phoneNumber: this.fb.control(null, [Validators.required]),
        gender: this.fb.control(null),
        clientGroup: this.fb.control([], [Validators.required]),
        coordinator: this.fb.control(null),
        sendSMS: this.fb.control(false),
      }),
      [ClientCreateFormStepId.Address]: this.fb.group({
        index: this.fb.control(null),
        country: this.fb.control(null, Validators.required),
        area: this.fb.control(''),
        city: this.fb.control(null, Validators.required),
        street: this.fb.control(''),
        house: this.fb.control(''),
      }),
      [ClientCreateFormStepId.Identity]: this.fb.group({
        documentType: this.fb.control(null, Validators.required),
        series: this.fb.control(''),
        number: this.fb.control(null, Validators.required),
        issuedBy: this.fb.control(''),
        dateOfIssue: this.fb.control(null, Validators.required),
        file: this.fb.control(null),
      }),
    });
  }
}


