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

const schema = z.object({
  name: z.string().min(1, "Tên là bắt buộc"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
  address: z.string().min(1, "Địa chỉ là bắt buộc"),
});

type CheckoutFormType = z.infer<typeof schema>;

const CheckoutForm = () => {
  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const { items, getTotal } = useCartStore();
  const { user, loadUserFromLocalStorage } = useUserStore();
  const [jsonData, setJsonData] = useState<string>();

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  const { toast } = useToast();
  const [order, setOrder] = useState<TOrderResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    loadUserFromLocalStorage();
  }, [loadUserFromLocalStorage]);

  const handleOrder = async (reason: string) => {
    const orderObject = {
      userID: user?.id || "",
      totalAmount: 0,
      reason: reason,
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

  const handlePayOs = async (reason: string) => {
    setIsLoading(true); // Bắt đầu loading
    try {
      const createdOrder = await handleOrder(reason);
      console.log("createdOrder", createdOrder);
      const response = await createPayment({
        orderId: createdOrder.id,
        description: "Thanh toán ngay",
        returnUrl: `${envConfig.NEXT_PUBLIC_URL}/payment-success`,
        cancelUrl: `${envConfig.NEXT_PUBLIC_URL}/checkout`,
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
      setIsLoading(false);
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
            {/* <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tỉnh/Thành phố</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn tỉnh/thành phố" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {provinces.map((item, index) => (
                          <SelectItem key={index} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quận/Huyện</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn quận/huyện" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {districts.map((item, index) => (
                          <SelectItem key={index} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phường/Xã</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn phường/xã" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {wards.map((item, index) => (
                          <SelectItem key={index} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}
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
                  {formatPriceVND(getTotal())}
                </CardTitle>
                <CardDescription>
                  Số lượng: {totalQuantity} sản phẩm
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className=" flex items-center space-x-4 rounded-md border p-4"
                  >
                    <div className="relative w-16 h-16">
                      <Image
                        src={
                          item.img && isValidUrl(item.img)
                            ? item.img
                            : "/images/blue-sky.jpg"
                        }
                        alt={item.productName}
                        layout="fill"
                        className="rounded-lg object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {item.productName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Đơn giá: {formatPriceVND(item.finalPrice)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-sm font-medium leading-none">
                        {formatPriceVND(item.finalPrice)}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex justify-between text-lg ">
                <span className="font-bold ">Tổng cộng:</span>
                <span>{formatPriceVND(getTotal())}</span>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CheckoutForm;
