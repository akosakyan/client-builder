import { FormControl, FormGroup } from '@angular/forms';
import {
  ClientModel,
  AddressModel,
  IdentityVerificationModel,
} from '@app/models';

export enum ClientCreateFormStepId {
  Client = 'client',
  Address = 'address',
  Identity = 'identity',
}

export interface IClientCreateFormStepRouteData {
  stepId: ClientCreateFormStepId;
  stepLabel: string;
}

export interface IClientCreateFormStep extends IClientCreateFormStepRouteData {
  stepRoutePath: string;
}

export type ClientDataForm = {
  [ClientCreateFormStepId.Client]: FormGroup,
  [ClientCreateFormStepId.Address]: FormGroup,
  [ClientCreateFormStepId.Identity]: FormGroup,
};

export type ClientData = {
  [ClientCreateFormStepId.Client]: ClientModel,
  [ClientCreateFormStepId.Address]: AddressModel,
  [ClientCreateFormStepId.Identity]: IdentityVerificationModel,
};

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<any, any>
    ? FormGroup<ControlsOf<T[K]>>
    : FormControl<T[K]>;
};
