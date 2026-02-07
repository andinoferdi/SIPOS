export const DASHBOARD_BASE = "/dashboard";

export const withDashboardBase = (path: string) => {
  if (path === "/") return DASHBOARD_BASE;
  return `${DASHBOARD_BASE}${path}`;
};
