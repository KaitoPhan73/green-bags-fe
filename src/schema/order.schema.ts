import z from "zod";
import { OrderItemResponseSchema } from "./order-item.schema";
import { AccountResponseSchema } from "./account.schema";

// Schema cho Order
export const OrderResponseSchema = z.object({
  id: z.string().uuid(),
  createdDate: z.string(),
  modifiedDate: z.string().nullable(),
  createdBy: z.string().nullable(),
  modifiedBy: z.string().nullable(),
  status: z.enum(["ACTIVE", "INACTIVE", "COMPLETED"]),
  orderDate: z.string(),
  totalAmount: z.number(),
  shippingAddress: z.string(),
  orderStatus: z.string(),
  reason: z.string(),
  userId: z.string().uuid(),
  orderItems: z.array(OrderItemResponseSchema),
});

export const CreateOrderSchema = z.object({
  userID: z.string(),
  totalAmount: z.number().min(0, { message: "Tổng tiền không được âm." }),
  shippingAddress: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE", "COMPLETED"]),
  reason: z.string().optional(),
  orderStatus: z.string(),
});

export const UpdateOrderSchema = z.object({
  orderDate: z.string().optional(),
  totalAmount: z.number().optional(),
  shippingAddress: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "COMPLETED"]).optional(),
  orderStatus: z.string().optional(),
  createdDate: z.string(),
  modifiedDate: z.string().nullable(),
  createdBy: z.string().nullable(),
  modifiedBy: z.string().nullable(),
  orderCode: z.string().optional(),
  reason: z.string(),
  userId: z.array(AccountResponseSchema),
  orderItems: z.array(OrderItemResponseSchema),
});

export type TCreateOrderRequest = z.TypeOf<typeof CreateOrderSchema>;
export type TUpdateOrderRequest = z.TypeOf<typeof UpdateOrderSchema>;
export type TOrderResponse = z.TypeOf<typeof OrderResponseSchema>;
