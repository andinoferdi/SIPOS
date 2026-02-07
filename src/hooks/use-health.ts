"use client";

import { useQuery } from "@tanstack/react-query";
import { healthService } from "@/services/health.service";

export const useHealth = () => {
  return useQuery({
    queryKey: ["health"],
    queryFn: healthService.get,
  });
};
