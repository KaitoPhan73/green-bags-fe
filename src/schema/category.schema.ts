import { z } from "zod";

// Schema cho Category
export const CategoryResponseSchema = z.object({
  id: z.string().uuid(),
  createdDate: z.string(),
  modifiedDate: z.string().nullable(),
  createdBy: z.string().nullable(),
  modifiedBy: z.string().nullable(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  categoryName: z.string(),
  description: z.string(),
});

export const CreateCategorySchema = z.object({
  categoryName: z
    .string()
    .min(1, { message: "Tên danh mục không được trống." }),
  description: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export const UpdateCategorySchema = z.object({
  id: z.string(),
  categoryName: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export type TCreateCategoryRequest = z.TypeOf<typeof CreateCategorySchema>;
export type TUpdateCategoryRequest = z.TypeOf<typeof UpdateCategorySchema>;
export type TCategoryResponse = z.TypeOf<typeof CategoryResponseSchema>;
