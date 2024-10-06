import { httpBag } from "@/lib/http";
import {
  TMomoPaymentRequest,
  TMomoGetStatusRequest,
} from "@/schema/momo.schema";

// Hàm thanh toán Momo
const createMomoPayment = async (body: TMomoPaymentRequest) => {
  return await httpBag.post("/momo-payment", body);
};

// Hàm lấy trạng thái thanh toán
const getMomoPaymentStatus = async (
  body: TMomoGetStatusRequest
): Promise<void> => {
  await httpBag.post(`/get-status`, body);
};

// Callback từ Momo
const momoCallback = async (data?: any): Promise<void> => {
  await httpBag.get("/callback", data);
};

export { createMomoPayment, getMomoPaymentStatus, momoCallback };
