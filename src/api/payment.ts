"use server";
import { httpBag } from "@/lib/http";
import { TPaymentRequest, TPaymentResponse } from "@/schema/payment.schema";

const createPayment = async (body: TPaymentRequest) => {
  return await httpBag.post<TPaymentResponse>("/payment/create", body);
};

// Hàm lấy trạng thái thanh toán
const getPaymentStatus = async (orderCode: string) => {
  return await httpBag.get<any>(`payment/handle-payment-status/${orderCode}`);
};

export { createPayment, getPaymentStatus };
