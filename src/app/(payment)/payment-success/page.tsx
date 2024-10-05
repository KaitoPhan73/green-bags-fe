"use client";

import { createOrder } from "@/api/order";
import { createOrderItem } from "@/api/order-item";
import { getPaymentStatus } from "@/api/payment";
import { useToast } from "@/hooks/use-toast";
import { TProductResponse } from "@/schema/product.schema";
import useCartStore from "@/store/cartStore";
import useUserStore from "@/store/userStore";
import { CartItem } from "@/types/Cart";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  data?: any;
}

export default function PaymentCompletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderCode = searchParams.get("orderCode");
  const { clearCart, getTotal } = useCartStore();
  const { user, loadUserFromLocalStorage } = useUserStore();

  useEffect(() => {
    loadUserFromLocalStorage();
  }, [loadUserFromLocalStorage]);
  const [message, setMessage] = useState("Đang thanh toán...");
  const [countdown, setCountdown] = useState(4);
  const { toast } = useToast();
  const handlePayment = async () => {
    try {
      if (!orderCode) {
        setMessage("Không tìm thấy mã đơn hàng");
        return;
      }
      const response = await getPaymentStatus(orderCode);
      console.log("response", response);
      if (response.payload.data.status === "PAID") {
        setMessage("Thanh toán thành công đang về trang chủ...");
        localStorage.removeItem("cart-storage");
        clearCart();
      } else {
        setMessage("Thanh toán thất bại");
      }
      toast({
        title: message,
      });
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng", error);
    }

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  };

  useEffect(() => {
    handlePayment();
  }, []);
  return (
    <div className="px-5 h-screen flex flex-col items-center justify-center">
      <h1>Thanh toán hoàn thành</h1>
      <p>{message}</p>
      <p>Chuyển hướng trong {countdown} giây...</p>
    </div>
  );
}
