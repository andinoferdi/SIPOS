export type PortalHttpErrorCode =
  | "forbidden"
  | "workspace_not_found"
  | "instance_not_found"
  | "instance_not_table_service"
  | "type_immutable"
  | "duplicate_name"
  | "duplicate_table_label"
  | "conflict"
  | "invalid_payload"
  | "invalid_query"
  | "internal_error";

export function mapPortalErrorCode(code: string): {
  error: PortalHttpErrorCode;
  status: number;
} {
  if (code === "forbidden") return { error: "forbidden", status: 403 };
  if (code === "workspace_not_found") return { error: "workspace_not_found", status: 404 };
  if (code === "instance_not_found") return { error: "instance_not_found", status: 404 };
  if (code === "instance_not_table_service") {
    return { error: "instance_not_table_service", status: 400 };
  }
  if (code === "type_immutable") return { error: "type_immutable", status: 400 };
  if (code === "duplicate_name") return { error: "duplicate_name", status: 409 };
  if (code === "duplicate_table_label") return { error: "duplicate_table_label", status: 409 };
  if (code === "conflict") return { error: "conflict", status: 409 };
  if (code === "invalid_payload") return { error: "invalid_payload", status: 400 };
  if (code === "invalid_query") return { error: "invalid_query", status: 400 };
  return { error: "internal_error", status: 500 };
}
