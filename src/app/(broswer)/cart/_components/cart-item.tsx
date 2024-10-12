"use client";
import useCartStore from "@/store/cartStore";
import { BadgeX, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { CartItem as CartItemType } from "@/types/Cart";
import React from "react";
import { formatPriceVND } from "@/lib/formatter";
import { isValidUrl } from "@/lib/utils";
type CartItemProps = {
  item: CartItemType;
};
const CartItem = ({ item }: CartItemProps) => {
  const { updateItemQuantity, removeItem } = useCartStore();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
      <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
        <div className="img-box">
          <Image
            src={
              item.img && isValidUrl(item.img)
                ? item.img
                : "/images/blue-sky.jpg"
            }
            alt="perfume bottle image"
            width={140}
            height={140}
            className="xl:w-[140px]"
          />
        </div>
        <div className="pro-data w-full max-w-sm ">
          <h5 className="font-semibold text-xl leading-8 text-black dark:text-white max-[550px]:text-center">
            {item.productName}
          </h5>
          <h6 className="font-medium text-lg leading-8 text-indigo-600 dark:text-white  max-[550px]:text-center">
            {formatPriceVND(item.finalPrice)}
          </h6>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <h6 className="font-manrope font-bold text-2xl leading-9 text-black dark:text-white w-full max-w-[176px] text-center">
          {formatPriceVND(0)}
          <span className="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap">
            (Delivery Charge)
          </span>
        </h6>
        <div className="flex items-center w-full mx-auto justify-center">
          <button
            className="group rounded-l-full px-5 py-5 border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
            onClick={() =>
              updateItemQuantity(item.id, Math.max(1, item.quantity - 1))
            }
          >
            <Minus className="w-5 h-5" />
          </button>
          <input
            type="text"
            className="border-y border-gray-200 outline-none  font-semibold text-lg w-full max-w-[100px] min-w-[80px]  py-4 text-center bg-transparent"
            value={item.quantity}
          />
          <button
            className="group rounded-r-full px-5 py-5 border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
          {formatPriceVND(item.finalPrice * item.quantity)}
        </h6>
        <div
          className="min-w-[100px] flex justify-center items-center"
          onClick={() => removeItem(item.id)}
        >
          <BadgeX className="w-10 h-10 text-destructive cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
