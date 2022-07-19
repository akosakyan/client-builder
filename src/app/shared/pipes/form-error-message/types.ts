export type HashMap<T = any> = {
  [errorMsg: string]: T;
};

export type FormErrorMessageGetterFn = (err: any) => string;
export type FormErrorMessagesMap = HashMap<string | FormErrorMessageGetterFn>;
