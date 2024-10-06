import z from "zod";
import { ProductResponseSchema } from "./product.schema";

export const CustomResponseSchema = z.object({
  id: z.string().uuid(),
  createdDate: z.string(),
  modifiedDate: z.string(),
  createdBy: z.string(),
  modifiedBy: z.string(),
  status: z.enum([
    "PROCESSING",
    "CANCELLED",
    "ACCEPTED",
    "COMPLETED",
    "ACTIVE",
    "INACTIVE",
  ]), // Cập nhật status ở đây
  imageURL: z.string(),
  customValue: z.string(),
  totalPrice: z.number(),
  productID: ProductResponseSchema,
});

export const CreateCustomProductSchema = z.object({
  productId: z.string().uuid(),
  optionId: z.string().uuid(),
  imageURL: z.string().uuid(),
  customValue: z.string().uuid(),
  status: z.enum(["PROCESSING", "CANCELLED", "ACCEPTED", "COMPLETED"]), // Cập nhật status ở đây
  userId: z.string().uuid(),
});

export type TCustomResponse = z.TypeOf<typeof CustomResponseSchema>;
export type TCreateCustomProductRequest = z.TypeOf<
  typeof CreateCustomProductSchema
>;
