"use client";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
import { TCustomResponse } from "@/schema/custom.schema";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { DialogPaymentCustom } from "@/components/dialog-payment-custom";
import { formattedDateTime } from "@/lib/formatter";
import { DialogImg } from "../_components/dialog-img";
import { useToast } from "@/hooks/use-toast";
import { updateCustomProductStatus } from "@/api/custom";
import { Button } from "@/components/ui/button";
import { DialogCheckoutCustom } from "../_components/dialog-checkout-custom";

type Props = {
  data: TCustomResponse;
};

const CustomDetail = ({ data }: Props) => {
  const { toast } = useToast();
  const handleCancelOrder = async () => {
    try {
      const customObject = {
        id: data.id,
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
    <div>
      {/* Header */}
      <div className="hidden lg:grid grid-cols-5 py-3 gap-4">
        <div className="font-normal text-xl leading-8 text-gray-500">
          Tên Sản Phẩm
        </div>
        <div className="font-normal text-xl leading-8 text-gray-500">
          Số lượng
        </div>
        <div className="font-normal text-xl leading-8 text-gray-500 text-center">
          Ngày Đặt
        </div>
        <div className="font-normal text-xl leading-8 text-gray-500 text-center">
          Giá (VND)
        </div>
        <div className="font-normal text-xl leading-8 text-gray-500 text-center">
          Thanh toán
        </div>
      </div>

      <section className="w-full mx-auto mt-5 mb-5">
        <div className="grid grid-cols-5 gap-4 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          {/* Tên Sản Phẩm */}
          <div className="px-4 py-6 flex items-center justify-start">
            <span className="text-lg font-bold text-black truncate capitalize">
              {data.productID.productName}
            </span>
          </div>

          {/* Số Lượng */}
          <div className="px-4 py-6 flex items-center justify-center">
            <DialogImg imgURL={data.imageURL} />
          </div>

          {/* Ngày Đặt */}
          <div className="px-4 py-6 flex items-center justify-center">
            <p className="text-lg font-semibold text-black">
              {formattedDateTime(data.createdDate)}
            </p>
          </div>

          {/* Giá (VND) */}
          <div className="px-4 py-6 flex items-center justify-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="px-4 py-6 flex items-center justify-center">
                    <FaEye className="h-6 w-6" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex flex-col gap-4">
                    {data.customValue ? (
                      // Kiểm tra xem customValue có phải là chuỗi hay không
                      typeof data.customValue === "string" ? (
                        // Nếu là chuỗi, kiểm tra xem nó có phải là hình ảnh hay không
                        (() => {
                          try {
                            const parsedValue = JSON.parse(data.customValue);
                            // Nếu parse thành công và là mảng
                            if (
                              Array.isArray(parsedValue) &&
                              parsedValue.length > 0
                            ) {
                              console.log(parsedValue);
                              return parsedValue.map(
                                (img: string, index: number) => (
                                  <Image
                                    key={index}
                                    src={img}
                                    alt="Custom Image"
                                    width={100}
                                    height={100}
                                  />
                                )
                              );
                            } else {
                              // Nếu không phải là mảng, in ra giá trị chuỗi
                              return <p>{data.customValue}</p>;
                            }
                          } catch (error) {
                            // Nếu parse gặp lỗi, coi như là một chuỗi đơn giản và in ra
                            return <p>{data.customValue}</p>;
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
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Thanh toán */}
          <div className="px-4 py-6 flex items-center justify-center">
            {data.status === "ACCEPTED" ? (
              <DialogCheckoutCustom data={data} />
            ) : data.status === "PROCESSING" ? (
              <Button className="" onClick={handleCancelOrder}>
                Hủy
              </Button>
            ) : data.status === "COMPLETED" ? (
              <p className="text-green-500 font-semibold">Hoàn thành</p>
            ) : data.status === "CANCELLED" ? (
              <p className="text-gray-500 font-semibold">Đã Hủy.</p>
            ) : (
              <p className="text-red-500 font-semibold">Chờ xác nhận.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomDetail;
