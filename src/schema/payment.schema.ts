import z from "zod";

// Schema cho Payment
export const PaymentSchema = z.object({
  orderId: z.string().min(1, { message: "ID đơn hàng không được trống." }), // Đảm bảo orderId không trống
  description: z.string().min(1, { message: "Mô tả không được trống." }), // Đảm bảo description không trống
  returnUrl: z.string().url({ message: "URL trả về phải hợp lệ." }), // URL hợp lệ
  cancelUrl: z.string().url({ message: "URL hủy phải hợp lệ." }), // URL hợp lệ
});
export const PaymentResponseSchema = z.object({
  error: z
    .number()
    .int()
    .min(0, { message: "Giá trị error phải là số nguyên không âm." }), // Lỗi là một số nguyên
  message: z.string().min(1, { message: "Thông điệp không được trống." }), // Thông điệp không được trống
  data: z.object({
    bin: z.string().min(1, { message: "BIN không được trống." }), // BIN không được trống
    accountNumber: z
      .string()
      .min(1, { message: "Số tài khoản không được trống." }), // Số tài khoản không được trống
    accountName: z
      .string()
      .min(1, { message: "Tên tài khoản không được trống." }), // Tên tài khoản không được trống
    amount: z.number().min(0, { message: "Số tiền không được âm." }), // Số tiền không được âm
    description: z.string().min(1, { message: "Mô tả không được trống." }), // Mô tả không được trống
    orderCode: z
      .number()
      .int()
      .min(1, { message: "Mã đơn hàng phải là số nguyên dương." }), // Mã đơn hàng phải là số nguyên dương
    currency: z.string().min(1, { message: "Loại tiền tệ không được trống." }), // Loại tiền tệ không được trống
    paymentLinkId: z
      .string()
      .min(1, { message: "ID liên kết thanh toán không được trống." }), // ID liên kết thanh toán không được trống
    status: z.string().min(1, { message: "Trạng thái không được trống." }), // Trạng thái không được trống
    checkoutUrl: z
      .string()
      .url({ message: "Checkout URL phải là URL hợp lệ." }), // URL checkout phải hợp lệ
    qrCode: z.string().min(1, { message: "QR code không được trống." }), // QR code không được trống
  }),
});

// Type cho Payment Response
export type TPaymentResponse = z.TypeOf<typeof PaymentResponseSchema>;

// Type cho Payment Request
export type TPaymentRequest = z.TypeOf<typeof PaymentSchema>;
