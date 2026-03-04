export type PortalInstance = {
  id: string;
  name: string;
  type: "TABLE_SERVICE" | "TAB_SERVICE";
  total_table: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  table_labels: Array<{
    position: number;
    label: string;
  }>;
};

export type PortalData = {
  workspace: {
    id: string;
    code: string;
    name: string;
  };
  items: PortalInstance[];
};

export type CreatePortalInstancePayload = {
  name: string;
  type: PortalInstance["type"];
  total_table?: number;
};

export type UpdatePortalInstancePayload = {
  name?: string;
  total_table?: number;
};

export type UpdatePortalTableLabelPayload = {
  label: string;
};

export type DeletePortalInstanceResponse = {
  id: string;
  is_active: boolean;
};

export type UpdatePortalTableLabelResponse = {
  pos_instance_id: string;
  position: number;
  label: string;
};
