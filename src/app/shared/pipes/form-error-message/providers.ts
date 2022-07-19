import { InjectionToken, ValueProvider } from '@angular/core';
import { FormErrorMessagesMap } from './types';

export const FORM_ERROR_MESSAGES_CONFIG =
  new InjectionToken<FormErrorMessagesMap>('FORM_ERROR_MESSAGES_CONFIG');

export function provideErrorMessagesHashMap(map: FormErrorMessagesMap): ValueProvider {
  return {
    provide: FORM_ERROR_MESSAGES_CONFIG,
    useValue: map,
    multi: true
  };
}
