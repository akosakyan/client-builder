import { Inject, Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import { FORM_ERROR_MESSAGES_CONFIG } from './providers';
import { FormErrorMessagesMap } from './types';

/**
 * @link https://www.accessibility-developer-guide.com/examples/forms/validation-messages/
 * */
@Pipe({
  standalone: true,
  pure: true,
  name: 'formErrorMsg'
})
export class FormErrorMessagePipe implements PipeTransform {
  constructor(
    @Inject(FORM_ERROR_MESSAGES_CONFIG) private formErrorMessagesMap: Array<FormErrorMessagesMap>
  ) {}

  transform(errors: ValidationErrors | null, overrideErrMessages: FormErrorMessagesMap = {}): string | null {
    if (!errors) {
      return null;
    }

    const errorDictionary = this.formErrorMessagesMap
      .reduce((acc, map) => ({ ...acc, ...map}), {
        ...overrideErrMessages
      });

    const errorKey = Object.keys(errors)[0];
    const errorMsgFnOrString = errorDictionary[errorKey];

    if (typeof errorMsgFnOrString === 'function') {
      return errorMsgFnOrString( errors[errorKey] ) as string;
    }

    return errorMsgFnOrString;
  }
}
