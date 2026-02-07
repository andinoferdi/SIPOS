import { fetcher } from "@/services/base";

export interface HealthResponse {
  status: "ok";
  timestamp: string;
}

export const healthService = {
  get: () => fetcher<HealthResponse>("/api/health"),
};
