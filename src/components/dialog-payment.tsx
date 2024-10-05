import { createPayment } from "@/api/payment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createOrder } from "@/api/order";
import { createOrderItem } from "@/api/order-item";
import useCartStore from "@/store/cartStore";
import useUserStore from "@/store/userStore";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CartItem } from "@/types/Cart";
import { TOrderResponse } from "@/schema/order.schema";
import envConfig from "@/schema/config";

export function DialogPayment({ totalAmt }: { totalAmt: number }) {
  const { toast } = useToast();
  const [order, setOrder] = useState<TOrderResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Thêm state cho loading
  const { items, clearCart, getTotal } = useCartStore();
  const { user, loadUserFromLocalStorage } = useUserStore();

  useEffect(() => {
    loadUserFromLocalStorage();
  }, [loadUserFromLocalStorage]);

  const handleOrder = async () => {
    const orderObject = {
      userID: user?.id || "",
      totalAmount: totalAmt, // Sử dụng totalAmt từ props
      orderStatus: "ACTIVE",
      status: "ACTIVE" as "ACTIVE",
      shippingAddress: "HCM",
    };

    try {
      const response = await createOrder(orderObject);
      const createdOrder = response.payload;
      setOrder(createdOrder);

      await Promise.all(
        items.map(async (item: CartItem) => {
          await createOrderItem({
            quantity: item.quantity,
            orderID: createdOrder.id,
            productID: item.id,
            unitPrice: item.finalPrice,
            status: "ACTIVE",
          });
        })
      );

      return createdOrder;
    } catch (error) {
      toast({
        title: `Lỗi xảy ra, ${error}`,
      });
      console.error("Lỗi khi tạo đơn hàng", error);
      throw error;
    }
  };

  const handlePayOs = async () => {
    setIsLoading(true); // Bắt đầu loading
    try {
      const createdOrder = await handleOrder();
      console.log("createdOrder", createdOrder);
      const response = await createPayment({
        orderId: createdOrder.id,
        description: "Thanh toán ngay",
        returnUrl: `${envConfig.NEXT_PUBLIC_URL}/payment-success`,
        cancelUrl: `${envConfig.NEXT_PUBLIC_URL}/cart`,
      });

      if (response.status === 200) {
        toast({
          title: "Đã chuyển sang trang thanh toán",
        });

        window.open(response.payload.data.checkoutUrl, "_blank");
        setOrder(null);
      } else {
        toast({
          title: "Lỗi xảy ra trong quá trình thanh toán",
        });
      }
    } catch (error) {
      console.error("Lỗi trong quá trình thanh toán:", error);
    } finally {
      setIsLoading(false); // Kết thúc loading
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700"
          disabled={isLoading}
        >
          <span className="px-2">
            {isLoading ? "Đang xử lý..." : "Thanh toán"}
          </span>
          <ChevronRight
            className={`w-6 h-6 text-white ${isLoading ? "animate-spin" : ""}`}
          />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chọn phương thức thanh toán</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="img-box" onClick={handlePayOs}>
            <Image
              src="/images/payOs.svg"
              alt="PayOs"
              width={140}
              height={140}
              className="xl:w-[140px] border-2"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
