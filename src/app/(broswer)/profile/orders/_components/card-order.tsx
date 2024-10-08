"use client";
import { BellIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn, isValidUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TOrderResponse } from "@/schema/order.schema";
import Image from "next/image";
import { formatPriceVND } from "@/lib/formatter";
import { useRouter } from "next/navigation";
import { DialogReview } from "./dialog-review";
import useUserStore from "@/store/userStore";

type Props = {
  item: TOrderResponse;
  index: number;
};
export function CardOrder({ item, index }: Props) {
  const router = useRouter();
  const { user } = useUserStore();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div>
            No.{index + 1} (
            {item.orderStatus === "PENDING"
              ? "Đang chờ thanh toán"
              : "Đã Thanh toán"}
            )
          </div>
          <div>{formatPriceVND(item.totalAmount)} </div>
        </CardTitle>
        <CardDescription>Số lượng: {item.orderItems.length}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {item.orderItems.map((orderItem, index) => (
          <div
            key={index}
            className=" flex items-center space-x-4 rounded-md border p-4"
          >
            <div className="relative w-16 h-16">
              <Image
                src={
                  orderItem.product.img && isValidUrl(orderItem.product.img)
                    ? orderItem.product.img
                    : "/images/blue-sky.jpg"
                }
                alt={orderItem.product.productName}
                layout="fill"
                className="rounded-lg object-cover"
              />
            </div>

            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {orderItem.product.productName}
              </p>
              <p className="text-sm text-muted-foreground">
                Đơn giá: {formatPriceVND(orderItem.product.finalPrice)}
              </p>
              <p className="text-sm text-muted-foreground">
                Số lượng: {orderItem.quantity}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <p className="text-sm font-medium leading-none">
                {formatPriceVND(orderItem.unitPrice)}
              </p>

              {item.status === "COMPLETED" &&
                (!orderItem.isReview ? (
                  <DialogReview data={orderItem.product} />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Cảm ơn bạn đã đánh giá
                  </p>
                ))}
            </div>
          </div>
        ))}
      </CardContent>
      {/* {item.orderStatus === "PENDING" && (
        <CardFooter>
          <Button className="w-full" onClick={() => router.push("/checkout")}>
            Vui lòng Thanh toán <CheckIcon className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      )} */}
    </Card>
  );
}
