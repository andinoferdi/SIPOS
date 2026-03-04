import type { ApiFieldErrors } from "@/services/http/types";

export class ServiceHttpError extends Error {
  code: string;
  status?: number;
  fieldErrors?: ApiFieldErrors;

  constructor(code: string, options?: { status?: number; fieldErrors?: ApiFieldErrors }) {
    super(code);
    this.name = "ServiceHttpError";
    this.code = code;
    this.status = options?.status;
    this.fieldErrors = options?.fieldErrors;
  }
}
