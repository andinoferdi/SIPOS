export type ApiFieldErrors = Record<string, string[]>;

export type ApiSuccess<T> = {
  ok: true;
  data: T;
};

export type ApiFailure = {
  ok: false;
  error: string;
  fieldErrors?: ApiFieldErrors;
};

export type ApiEnvelope<T> = ApiSuccess<T> | ApiFailure;
