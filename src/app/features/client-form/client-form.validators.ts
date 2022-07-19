import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { format, isValid, toDate, isBefore } from 'date-fns';

import { Telephone } from '@app/shared/components/telephone-input';

export class ClientFormValidators {

  static minMaxDigitsCount(min: number, max: number): ValidatorFn {
    return (fc: AbstractControl) => {
      const validatorFn = Validators.compose([
        Validators.minLength(min),
        Validators.maxLength(max),
      ]) as ValidatorFn;

      return validatorFn({ value: fc.value?.toString() } as AbstractControl);
    };
  }

  static validatePhoneNumber(): ValidatorFn {
    return (fc: AbstractControl) => {
      const value = fc.value as Telephone;

      if (!value) {
        return null;
      }

      const { area, exchange, subscriber } = value;

      const rowValue = [area, exchange, subscriber]
        .reduce((acc, value) => acc + value, '');

      const onlyDigits = rowValue.replace(/\D/g, '');

      if (onlyDigits.length) {
        return null;
      }

      return { pattern: true };
    };
  }

  static dateMinimum(date: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) {
        return null;
      }

      const controlDate = toDate(control.value);

      if (!isValid(controlDate)) {
        return null;
      }

      const validationDate = toDate(date);

      return isBefore(controlDate, validationDate) ? null : {
        'date-minimum': {
          'date-minimum': format(validationDate, 'y-MM-dd'),
          'actual': format(controlDate, 'y-MM-dd')
        }
      };
    };
  }
}
