import z from "zod";

// Schema cho Order
export const OrderResponseSchema = z.object({
  id: z.string().uuid(),
  createdDate: z.string(),
  modifiedDate: z.string().nullable(),
  createdBy: z.string().nullable(),
  modifiedBy: z.string().nullable(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  orderDate: z.string(),
  totalAmount: z.number(),
  shippingAddress: z.string(),
  orderStatus: z.string(),
});

export const CreateOrderSchema = z.object({
  userID: z.string(),
  totalAmount: z.number().min(0, { message: "Tổng tiền không được âm." }),
  shippingAddress: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  orderStatus: z.string(),
});

export const UpdateOrderSchema = z.object({
  orderDate: z.string().optional(),
  totalAmount: z.number().optional(),
  shippingAddress: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  orderStatus: z.string().optional(),
});

export type TCreateOrderRequest = z.TypeOf<typeof CreateOrderSchema>;
export type TUpdateOrderRequest = z.TypeOf<typeof UpdateOrderSchema>;
export type TOrderResponse = z.TypeOf<typeof OrderResponseSchema>;
