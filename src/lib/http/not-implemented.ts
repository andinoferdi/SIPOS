import { apiError } from "@/lib/http/api-response";

export const buildNotImplementedResponse = (
  _endpointName?: string,
) => {
  return apiError("not_implemented", 501);
};
