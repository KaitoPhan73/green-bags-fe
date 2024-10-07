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
import Image from "next/image";
import { formatPriceVND } from "@/lib/formatter";
import { useRouter } from "next/navigation";
import { TCustomResponse } from "@/schema/custom.schema";
import { updateCustomProductStatus } from "@/api/custom";
import { useToast } from "@/hooks/use-toast";
import { DialogImg } from "./dialog-img";
import { DialogReason } from "./dialog-reason";
import { DialogCheckoutCustom } from "./dialog-checkout-custom";

type Props = {
  item: TCustomResponse;
  index: number;
};
export function CardCustomize({ item, index }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const handleCancelOrder = async () => {
    try {
      const customObject = {
        id: item.id,
        status: "CANCELLED",
      };
      const custom = await updateCustomProductStatus(customObject);
      toast({
        title: " Đã hủy.",
      });
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      toast({
        title: `Lỗi khi hủy: ${error}`,
      });
    }
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div>
            No.{index + 1} (
            {item.status === "PROCESSING"
              ? "Đang xử lý"
              : item.status === "ACCEPTED"
              ? "Đã được chấp nhận"
              : item.status === "COMPLETED"
              ? "Đã hoàn thành"
              : item.status === "CANCELLED"
              ? "Đã bị hủy"
              : "Trạng thái không xác định"}
            )
          </div>
          <div>{formatPriceVND(item.totalPrice)} </div>
        </CardTitle>
        <CardDescription>Mẫu gốc: {item.productID.productName}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex gap-4  items-center space-x-4 rounded-md border p-4 overflow-x-auto">
          {item.customValue ? (
            // Kiểm tra xem customValue có phải là chuỗi hay không
            typeof item.customValue === "string" ? (
              // Nếu là chuỗi, kiểm tra xem nó có phải là hình ảnh hay không
              (() => {
                try {
                  const parsedValue = JSON.parse(item.customValue);
                  // Nếu parse thành công và là mảng
                  if (Array.isArray(parsedValue) && parsedValue.length > 0) {
                    return parsedValue.map((img: string, index: number) => (
                      <DialogImg key={index} imgURL={img} />
                    ));
                  } else {
                    // Nếu không phải là mảng, in ra giá trị chuỗi
                    return <p>{item.customValue}</p>;
                  }
                } catch (error) {
                  // Nếu parse gặp lỗi, coi như là một chuỗi đơn giản và in ra
                  return <p>{item.customValue}</p>;
                }
              })()
            ) : (
              // Nếu không phải là chuỗi, hiển thị thông báo
              <p>Không có ảnh</p>
            )
          ) : (
            <p>Không có ảnh</p>
          )}
        </div>
      </CardContent>
      <div className="px-4 py-6 flex items-center justify-center">
        {item.status === "ACCEPTED" ? (
          <DialogCheckoutCustom data={item} />
        ) : item.status === "PROCESSING" ? (
          <Button className="w-full" onClick={handleCancelOrder}>
            Hủy
          </Button>
        ) : item.status === "COMPLETED" ? (
          <p className="text-green-500 font-semibold">Hoàn thành</p>
        ) : item.status === "CANCELLED" ? (
          <DialogReason className="w-full" reason={item.reason} />
        ) : (
          <p className="text-red-500 font-semibold">Chờ xác nhận.</p>
        )}
      </div>
    </Card>
  );
}
