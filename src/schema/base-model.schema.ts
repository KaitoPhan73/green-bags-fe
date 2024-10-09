import z from "zod";

// Schema cho BaseModel
export const BaseModelResponseSchema = z.object({
  id: z.string().uuid(),
  createdDate: z.string(),
  modifiedDate: z.string().nullable(),
  createdBy: z.string().nullable(),
  modifiedBy: z.string().nullable(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  modelName: z.string(),
  description: z.string(),
  basePrice: z.number().min(0, { message: "Giá không hợp lệ." }),
  customizationOptions: z.array(z.any()),
  products: z.array(z.any()),
});

export const CreateBaseModelSchema = z.object({
  modelName: z.string().min(1, { message: "Tên mẫu không được trống." }),
  description: z.string(),
  basePrice: z.coerce.number().min(0, { message: "Giá không hợp lệ." }),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  categoryID: z.string().uuid(),
  image: z.string(),
});

export const UpdateBaseModelSchema = z.object({
  id: z.string(),
  modelName: z.string().optional(),
  description: z.string().optional(),
  basePrice: z.coerce.number().optional(),
  categoryID: z.string().uuid().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  image: z.string().optional(),
});

export type TCreateBaseModelRequest = z.TypeOf<typeof CreateBaseModelSchema>;
export type TUpdateBaseModelRequest = z.TypeOf<typeof UpdateBaseModelSchema>;
export type TBaseModelResponse = z.TypeOf<typeof BaseModelResponseSchema>;
