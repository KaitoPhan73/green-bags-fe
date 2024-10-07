import { createPayment } from "@/api/payment";

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
import { TCustomResponse } from "@/schema/custom.schema";
import { createProduct } from "@/api/product";
import {
  TCreateProductRequest,
  TProductResponse,
} from "@/schema/product.schema";
import { CiCreditCard1 } from "react-icons/ci";

export function DialogPaymentCustom({ data }: { data: TCustomResponse }) {
  const { toast } = useToast();
  const { user, loadUserFromLocalStorage } = useUserStore();
  const [order, setOrder] = useState<TOrderResponse | null>(null);
  const [product, setProduct] = useState<TProductResponse>();
  const [isLoading, setIsLoading] = useState(false); // Thêm state cho loading

  useEffect(() => {
    loadUserFromLocalStorage();
  }, [loadUserFromLocalStorage]);

  // Hàm xử lý việc tạo đơn hàng
  const handleOrder = async (productId: string) => {
    const orderObject = {
      userID: user?.id || "",
      totalAmount: product?.finalPrice || 0, // Lấy totalAmount từ product
      orderStatus: "ACTIVE",
      status: "ACTIVE" as "ACTIVE",
      shippingAddress: "HCM",
    };

    try {
      const response = await createOrder(orderObject);
      const createdOrder = response.payload;
      setOrder(createdOrder);
      console.log("product", product);

      // Tạo OrderItem
      await createOrderItem({
        quantity: 1,
        orderID: createdOrder.id,
        productID: productId, // Sử dụng productId truyền vào
        unitPrice: product?.finalPrice || 0,
        status: "ACTIVE",
      });

      return { createdOrder, product }; // Trả về Order và Product
    } catch (error) {
      toast({
        title: `Lỗi xảy ra khi tạo đơn hàng: ${error}`,
      });
      console.error("Lỗi khi tạo đơn hàng", error);
      throw error;
    }
  };

  // Hàm xử lý việc tạo sản phẩm
  const handleProduct = async () => {
    const productObject: TCreateProductRequest = {
      baseModelID: data.productID.baseModelID,
      productName: `Sản phẩm custom hoàn thành - ${Date.now().toString()}`,
      stock: 3,
      description: "Sản phẩm custom hoàn thành",
      img: data.imageURL,
      finalPrice: data.totalPrice,
      status: "CUSTOM-DONE",
    };

    try {
      const response = await createProduct(productObject);
      const createdProduct = response.payload;
      setProduct(createdProduct);
      return createdProduct; // Trả về sản phẩm đã được tạo
    } catch (error) {
      toast({
        title: `Lỗi khi tạo sản phẩm: ${error}`,
      });
      console.error("Lỗi khi tạo sản phẩm", error);
    }
  };

  // Hàm xử lý thanh toán
  const handlePayOs = async () => {
    setIsLoading(true); // Bắt đầu loading
    try {
      const createdProduct = await handleProduct(); // Gọi hàm tạo sản phẩm trước
      if (!createdProduct) {
        throw new Error("Failed to create product");
      }
      const { createdOrder } = await handleOrder(createdProduct.id); // Gọi hàm tạo đơn hàng và truyền vào product.id
      console.log("createdOrder", createdOrder);
      const response = await createPayment({
        orderId: createdOrder.id,
        description: "Thanh toán ngay",
        returnUrl: `${envConfig.NEXT_PUBLIC_URL}/payment-custom-success`,
        cancelUrl: `${envConfig.NEXT_PUBLIC_URL}`,
      });

      if (response.status === 200) {
        toast({
          title: "Đã chuyển sang trang thanh toán",
        });
        localStorage.setItem("custom-id", data.id);
        window.open(response.payload.data.checkoutUrl, "_blank");
        setOrder(null);
      } else {
        toast({
          title: "Lỗi xảy ra trong quá trình thanh toán",
        });
      }
    } catch (error) {
      console.error("Lỗi trong quá trình thanh toán:", error);
      toast({
        title: `Lỗi trong quá trình thanh toán: ${error}`,
      });
    } finally {
      setIsLoading(false); // Kết thúc loading
    }
  };

  return (
    <button
      onClick={handlePayOs}
      className="rounded-sm w-full max-w-[280px] py-2 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700"
      disabled={isLoading}
    >
      <CiCreditCard1 className="h-6 w-6" />
    </button>
  );
}
