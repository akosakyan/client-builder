import { FormErrorMessagesMap } from './types';

function getFormErrorMessageByDefaultPattern(pattern: string) {
  const message = 'Allowed only';
  switch (pattern) {
    case '^[\\-_a-z0-9\\s]+$': {
      return `${message} following chars: 'A-Z a-z 0-9 _ -'`;
    }
    case '[0-9]*':
    case '^[0-9]\\d*$': {
      return `${message} digits.`;
    }

    default: {
      return 'Invalid field';
    }
  }
}

export const DEFAULT_FORM_ERROR_MESSAGES_MAP: FormErrorMessagesMap = {
  min: (pattern) => `Value must be at least ${pattern.min}`,
  max: (pattern) => `Value must be less or equal than ${pattern.max}`,
  email: 'Invalid email address',
  pattern: (pattern) => getFormErrorMessageByDefaultPattern(pattern.requiredPattern),
  required: () => 'Please enter a value',
  minlength: (pattern) => `Field must contains at least ${pattern.requiredLength} chars.`,
  maxlength: (pattern) => `Field must contains less or equal than ${pattern.requiredLength} chars.`
};
