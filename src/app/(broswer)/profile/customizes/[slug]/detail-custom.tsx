"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TOrderItemResponse } from "@/schema/order-item.schema";
import { getProductById } from "@/api/product";
import { formatPriceVND, formattedDateTime } from "@/lib/formatter";
import { TCustomResponse } from "@/schema/custom.schema";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

type Props = {
  data: TCustomResponse;
};

const CustomDetail = ({ data }: Props) => {
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
            <Image
              src={data.imageURL || "/no-image.png"}
              alt="Product Image"
              width={100}
              height={100}
            />
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
                  <Button>Xem ảnh thành phần</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex flex-col gap-4">
                    {data.customValue &&
                    Array.isArray(JSON.parse(data.customValue)) &&
                    JSON.parse(data.customValue).length > 0 ? (
                      JSON.parse(data.customValue).map(
                        (img: string, index: number) => (
                          <Image
                            key={index}
                            src={img}
                            alt="Custom Image"
                            width={100}
                            height={100}
                          />
                        )
                      )
                    ) : (
                      <p>Không có ảnh</p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomDetail;
