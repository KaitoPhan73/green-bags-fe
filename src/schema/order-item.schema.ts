import { z } from "zod";
import { ProductResponseSchema } from "./product.schema";

export const OrderItemResponseSchema = z.object({
  id: z.string().uuid(),
  createdDate: z.string(),
  modifiedDate: z.string().nullable(),
  createdBy: z.string().nullable(),
  modifiedBy: z.string().nullable(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  orderID: z.string().uuid(),
  product: ProductResponseSchema,
  quantity: z.number().min(1, { message: "Số lượng không hợp lệ." }),
  unitPrice: z.number().min(0, { message: "Giá không được âm." }),
  isReview: z.boolean().nullable(),
});

export const CreateOrderItemSchema = z.object({
  orderID: z.string().uuid(),
  productID: z.string().uuid(),
  quantity: z.number().min(1, { message: "Số lượng không hợp lệ." }),
  unitPrice: z.number().min(0, { message: "Giá không được âm." }),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export const UpdateOrderItemSchema = z.object({
  quantity: z.number().min(1).optional(),
  unitPrice: z.number().min(0).optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export type TCreateOrderItemRequest = z.TypeOf<typeof CreateOrderItemSchema>;
export type TUpdateOrderItemRequest = z.TypeOf<typeof UpdateOrderItemSchema>;
export type TOrderItemResponse = z.TypeOf<typeof OrderItemResponseSchema>;
