"use client";
import Image from "next/image";
import Link from "next/link";
import { TTableResponse } from "@/types/Table";
import { motion } from "framer-motion";
import { formatPriceVND } from "@/lib/formatter";
import { TOrderResponse } from "@/schema/order.schema";
import PaginationFilter from "@/components/pagination-filter";
import { CardOrder } from "./card-order";

type Props = {
  data: TTableResponse<TOrderResponse>;
  params: any;
};

const HistoryList = ({ data, params }: Props) => {
  console.log(data);
  return (
    <div>
      {data.listResult.length > 0 ? (
        <>
          {/* Items */}
          {data.listResult.map((item, index) => (
            <section key={index} className="w-full mx-auto mt-5 mb-5">
              <CardOrder item={item} index={index} />
            </section>
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

export default HistoryList;
