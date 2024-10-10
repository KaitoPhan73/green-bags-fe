"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import useCartStore from "@/store/cartStore";
import useUserStore from "@/store/userStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { formatPriceVND } from "@/lib/formatter";
import { isValidUrl } from "@/lib/utils";
import { ButtonAsync } from "@/components/button-async";
import { useToast } from "@/hooks/use-toast";
import { TOrderResponse } from "@/schema/order.schema";
import { useRouter } from "next/navigation";
import envConfig from "@/schema/config";
import { createPayment } from "@/api/payment";
import { createOrder } from "@/api/order";
import { CartItem } from "@/types/Cart";
import { createOrderItem } from "@/api/order-item";
import {
  TCreateProductRequest,
  TProductResponse,
} from "@/schema/product.schema";
import { createProduct } from "@/api/product";
import { TCustomResponse } from "@/schema/custom.schema";

const schema = z.object({
  name: z.string().min(1, "Tên là bắt buộc"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
  address: z.string().min(1, "Địa chỉ là bắt buộc"),
});

type CheckoutFormType = z.infer<typeof schema>;

const CheckoutCustomForm = ({ data }: { data: TCustomResponse }) => {
  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const { user, loadUserFromLocalStorage } = useUserStore();
  const { toast } = useToast();
  const [product, setProduct] = useState<TProductResponse>();

  const [order, setOrder] = useState<TOrderResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    loadUserFromLocalStorage();
  }, [loadUserFromLocalStorage]);

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
  const handleOrder = async (productId: string, reason: string) => {
    const orderObject = {
      userID: user?.id || "",
      totalAmount: 0, // Lấy totalAmount từ product
      orderStatus: "ACTIVE",
      status: "ACTIVE" as "ACTIVE",
      shippingAddress: "HCM",
      reason: reason,
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

  const handlePayOs = async (reason: string) => {
    setIsLoading(true); // Bắt đầu loading
    try {
      const createdProduct = await handleProduct(); // Gọi hàm tạo sản phẩm trước
      if (!createdProduct) {
        throw new Error("Failed to create product");
      }
      const { createdOrder } = await handleOrder(createdProduct.id, reason); // Gọi hàm tạo đơn hàng và truyền vào product.id
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

  const onSubmit = (data: CheckoutFormType) => {
    const jsonData = JSON.stringify(data);
    console.log("Form data:", data);
    console.log("JSON data:", jsonData);
    handlePayOs(jsonData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="container mx-auto p-6 flex gap-8">
          <div className="w-1/2 space-y-6">
            <h2 className="text-2xl font-bold mb-6">Thông tin giao hàng</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ tên</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập họ tên" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập email"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số điện thoại</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập số điện thoại" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa chỉ</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập địa chỉ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <ButtonAsync type="submit" isLoading={isLoading}>
              Thanh toán ngay
            </ButtonAsync>
          </div>

          <div className="w-1/2">
            <h2 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h2>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <div>Số tiền hàng</div>
                  {formatPriceVND(data.totalPrice)}
                </CardTitle>
                <CardDescription>Số lượng: 1 sản phẩm</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className=" flex items-center space-x-4 rounded-md border p-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={
                        data.imageURL && isValidUrl(data.imageURL)
                          ? data.imageURL
                          : "/images/blue-sky.jpg"
                      }
                      alt={data.id}
                      layout="fill"
                      className="rounded-lg object-cover"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-lg ">
                <span className="font-bold ">Tổng cộng:</span>
                <span>{formatPriceVND(data.totalPrice)}</span>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CheckoutCustomForm;
