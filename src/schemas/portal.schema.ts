import { z } from "zod";

export const createPortalInstanceSchema = z
  .object({
    name: z.string().trim().min(3, "Nama minimal 3 karakter").max(80, "Nama maksimal 80 karakter"),
    type: z.enum(["TABLE_SERVICE", "TAB_SERVICE"]),
    total_table: z.coerce.number().int().min(1, "Total meja minimal 1").max(500, "Total meja maksimal 500").optional(),
  })
  .superRefine((value, ctx) => {
    if (value.type === "TABLE_SERVICE") {
      if (!value.total_table || value.total_table < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["total_table"],
          message: "Total meja wajib untuk Table Service",
        });
      }
      return;
    }

    if (value.total_table !== undefined && value.total_table !== 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["total_table"],
        message: "Total meja harus kosong untuk Tab Service",
      });
    }
  });

export const updatePortalInstanceSchema = z
  .object({
    name: z.string().trim().min(3, "Nama minimal 3 karakter").max(80, "Nama maksimal 80 karakter").optional(),
    total_table: z.coerce.number().int().min(1, "Total meja minimal 1").max(500, "Total meja maksimal 500").optional(),
  })
  .refine((value) => value.name !== undefined || value.total_table !== undefined, {
    message: "Minimal satu field wajib diisi",
  });

export const tableLabelSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1, "Label wajib diisi")
    .max(10, "Label maksimal 10 karakter")
    .regex(/^[a-z0-9-]+$/, "Gunakan huruf kecil, angka, atau tanda minus"),
});

export type CreatePortalInstanceInput = z.output<typeof createPortalInstanceSchema>;
export type UpdatePortalInstanceInput = z.output<typeof updatePortalInstanceSchema>;
export type TableLabelInput = z.output<typeof tableLabelSchema>;
export type CreatePortalInstanceFormInput = z.input<typeof createPortalInstanceSchema>;
export type UpdatePortalInstanceFormInput = z.input<typeof updatePortalInstanceSchema>;
export type TableLabelFormInput = z.input<typeof tableLabelSchema>;
