import z from "zod";
import { ProductResponseSchema } from "./product.schema";
import { AccountResponseSchema } from "./account.schema";

export const CustomResponseSchema = z.object({
  id: z.string().uuid(),
  optionId: z.string().uuid(),
  createdDate: z.string(),
  modifiedDate: z.string(),
  createdBy: z.string(),
  modifiedBy: z.string(),
  status: z.enum(["PROCESSING", "CANCELLED", "ACCEPTED", "COMPLETED"]), // Cập nhật status ở đây
  imageURL: z.string(),
  customValue: z.string(),
  totalPrice: z.number(),
  productID: ProductResponseSchema,
  reason: z.string(),
  userId: z.string(),
});

export const CreateCustomProductSchema = z.object({
  productId: z.string().uuid(),
  optionId: z.string().uuid(),
  imageURL: z.string().uuid(),
  customValue: z.string().uuid(),
  status: z.enum(["PROCESSING", "CANCELLED", "ACCEPTED", "COMPLETED"]), // Cập nhật status ở đây
  userId: z.string().uuid(),
});

// Update Custom Product Schema
export const UpdateCustomProductSchema = z.object({
  id: z.string().uuid(),
  status: z
    .enum(["PROCESSING", "CANCELLED", "ACCEPTED", "COMPLETED"])
    .optional(),
  optionId: z.string().uuid(),
  imageURL: z.string(),
  customValue: z.string(),
  totalPrice: z.coerce.number(),
  reason: z.string().optional(),
  productID: ProductResponseSchema,
});

// Type Definitions
export type TCustomResponse = z.TypeOf<typeof CustomResponseSchema> & {
  reason: string;
};
export type TCreateCustomProductRequest = z.TypeOf<
  typeof CreateCustomProductSchema
>;
export type TUpdateCustomProductRequest = z.TypeOf<
  typeof UpdateCustomProductSchema
>;
