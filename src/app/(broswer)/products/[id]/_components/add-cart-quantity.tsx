"use client";
import AddToCartButton from "@/components/add-to-cart-btn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TProductResponse } from "@/schema/product.schema";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import React, { useState } from "react";
type Props = {
  data: TProductResponse;
};
const AddToCartQuantity = ({ data }: Props) => {
  const [value, setValue] = useState(1);
  const handleIncrement = () => {
    setValue((prevValue) => prevValue + 1);
  };
  const handleDecrement = () => {
    if (value > 0) {
      setValue((prevValue) => prevValue - 1);
    }
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2  border border-black rounded-sm">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 rounded-full"
          onClick={handleDecrement}
        >
          <AiOutlineMinus className="w-6 h-6 " />
        </Button>
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          min={1}
          className="w-16 text-center"
        />
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 rounded-full"
          onClick={handleIncrement}
        >
          <AiOutlinePlus className="w-6 h-6  " />
        </Button>
      </div>
      {data && <AddToCartButton product={data} quantity={value} />}
    </div>
  );
};

export default AddToCartQuantity;
