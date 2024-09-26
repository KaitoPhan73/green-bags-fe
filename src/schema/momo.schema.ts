import z from "zod";

// Schema cho Momo Payment
export const MomoPaymentSchema = z.object({
  amount: z.number().min(0, { message: "Số tiền không được âm." }),
  orderId: z.string().min(1, { message: "ID đơn hàng không được trống." }),
  orderInfo: z
    .string()
    .min(1, { message: "Thông tin đơn hàng không được trống." }),
  lang: z.enum(["vi", "en"]),
  extraData: z.string().optional(),
});

// Schema cho Get Status
export const MomoGetStatusSchema = z.object({
  amount: z.number().min(0, { message: "Số tiền không được âm." }),
  orderId: z.string().min(1, { message: "ID đơn hàng không được trống." }),
  orderInfo: z
    .string()
    .min(1, { message: "Thông tin đơn hàng không được trống." }),
  lang: z.enum(["vi", "en"]),
  extraData: z.string().optional(),
});

// Type cho Momo Payment Request
export type TMomoPaymentRequest = z.TypeOf<typeof MomoPaymentSchema>;

// Type cho Get Status Request
export type TMomoGetStatusRequest = z.TypeOf<typeof MomoGetStatusSchema>;
