"use client";
import Image from "next/image";
import Link from "next/link";
import { TTableResponse } from "@/types/Table";
import { motion } from "framer-motion";
import { formatPriceVND } from "@/lib/formatter";
import PaginationFilter from "@/components/pagination-filter";
import { TCustomResponse } from "@/schema/custom.schema";

type Props = {
  data: TTableResponse<TCustomResponse>;
  params: any;
};

const CustomList = ({ data, params }: Props) => {
  return (
    <div>
      {data.listResult.length > 0 ? (
        <>
          {/* Header */}
          <div className="hidden lg:grid grid-cols-3 py-3 gap-4">
            <div className="font-normal text-xl leading-8 text-gray-500">
              No.
            </div>
            <div className="font-normal text-xl leading-8 text-gray-500">
              Trạng thái
            </div>
            <div className="font-normal text-xl leading-8 text-gray-500 text-center">
              Tổng tiền
            </div>
          </div>

          {/* Items */}
          {data.listResult.map((item, index) => (
            <Link key={index} href={`customizes/${item.id}`}>
              <section key={index} className="w-full mx-auto mt-5 mb-5">
                <div className="grid grid-cols-3 gap-4 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                  {/* No. */}
                  <div className="px-4 py-6 flex items-center justify-start">
                    <span className="text-lg font-bold text-black truncate capitalize">
                      {index + 1}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="py-6 flex items-center justify-start">
                    <span className="text-lg font-bold text-black truncate capitalize">
                      {item.status === "PROCESSING"
                        ? "Đang xử lý"
                        : item.status === "ACCEPTED"
                        ? "Đã được chấp nhận"
                        : item.status === "COMPLETED"
                        ? "Đã hoàn thành"
                        : item.status === "CANCELLED"
                        ? "Đã bị hủy"
                        : "Trạng thái không xác định"}
                    </span>
                  </div>

                  {/* Total Price */}
                  <div className=" py-6 flex items-center justify-center">
                    <p className="text-lg font-semibold text-black">
                      {[
                        "PROCESSING",
                        "CANCELLED",
                        "ACCEPTED",
                        "COMPLETED",
                      ].includes(item.status)
                        ? item.status === "PROCESSING"
                          ? "Đang chờ xác nhận"
                          : item.status === "CANCELLED"
                          ? "Đã hủy"
                          : item.status === "ACCEPTED"
                          ? "Đã xác nhận"
                          : "Hoàn thành"
                        : formatPriceVND(item.totalPrice)}
                    </p>
                  </div>
                </div>
              </section>
            </Link>
          ))}
          <div className="flex justify-center mt-5 mb-5">
            <PaginationFilter page={params.page} totalPage={data.totalPage} />
          </div>
        </>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-col justify-center items-center gap-4"
        >
          <Image
            src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-3328225-2809510.png?f=webp"
            alt="not found"
            width={320}
            height={240}
          />

          <h1 className="font-titleFont text-xl font-bold uppercase">
            Giỏ hàng trống
          </h1>
        </motion.div>
      )}
    </div>
  );
};

export default CustomList;
