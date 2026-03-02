export type AuthRole = "admin" | "fnb" | "fnb_manager" | "host";

export type AuthUser = {
  id: string;
  email: string;
  role: AuthRole;
  name: string;
  workspaceCode: string;
};

export type LoginPayload = {
  identifier: string;
  password: string;
};
