import z from "zod";

// Schema cho Product
export const ProductResponseSchema = z.object({
  id: z.string().uuid(),
  createdDate: z.string(),
  modifiedDate: z.string().nullable(),
  createdBy: z.string().nullable(),
  modifiedBy: z.string().nullable(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  baseModelID: z.string().uuid(),
  finalPrice: z.string(),
});

export const CreateProductSchema = z.object({
  baseModelID: z.string().uuid(),
  productName: z.string().min(1, { message: "Tên sản phẩm không được trống." }),
  stock: z.number().min(1, { message: "Số lượng không hợp lệ." }),
  finalPrice: z.number().min(0, { message: "Giá không được âm." }),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export const UpdateProductSchema = z.object({
  baseModelID: z.string().uuid().optional(),
  productName: z.string().optional(),
  stock: z.number().optional(),
  finalPrice: z.number().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export type TCreateProductRequest = z.TypeOf<typeof CreateProductSchema>;
export type TUpdateProductRequest = z.TypeOf<typeof UpdateProductSchema>;
export type TProductResponse = z.TypeOf<typeof ProductResponseSchema>;
