"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { TOrderItemResponse } from "@/schema/order-item.schema";
import { formatPriceVND, formattedDateTime } from "@/lib/formatter";

type Props = {
  dataSource: TOrderItemResponse[];
};

const HistoryDetail = ({ dataSource }: Props) => {
  return (
    <div>
      {dataSource.length > 0 ? (
        <>
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

          {/* Items */}
          {dataSource.map((item, index) => (
            <section key={index} className="w-full mx-auto mt-5 mb-5">
              <div className="grid grid-cols-5 gap-4 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                {/* Tên Sản Phẩm */}
                <div className="px-4 py-6 flex items-center justify-start">
                  <span className="text-lg font-bold text-black truncate capitalize">
                    {item.product.productName}
                  </span>
                </div>

                {/* Số Lượng */}
                <div className="px-4 py-6 flex items-center justify-center">
                  <span className="text-lg font-bold text-black">
                    {item.quantity}
                  </span>
                </div>

                {/* Ngày Đặt */}
                <div className="px-4 py-6 flex items-center justify-center">
                  <p className="text-lg font-semibold text-black">
                    {formattedDateTime(item.createdDate)}
                  </p>
                </div>

                {/* Giá (VND) */}
                <div className="px-4 py-6 flex items-center justify-end">
                  <p className="text-lg font-semibold text-black">
                    {formatPriceVND(item.unitPrice)}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-col justify-center items-center gap-4 pb-20 pt-20"
        >
          <Image
            src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-3328225-2809510.png?f=webp"
            alt="not found"
            width={320}
            height={240}
          />
          <h1 className="font-titleFont text-xl font-bold uppercase">
            Lịch sử trống!
          </h1>
        </motion.div>
      )}
    </div>
  );
};

export default HistoryDetail;
