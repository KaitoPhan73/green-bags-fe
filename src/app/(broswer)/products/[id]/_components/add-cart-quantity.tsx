"use client";
import AddToCartButton from "@/components/add-to-cart-btn";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/Cart";
import React, { useState } from "react";
type Props = {
  data: Product;
};
const AddToCartQuantity = ({ data }: Props) => {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="flex items-center gap-4">
      <Input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="w-20 h-10"
        min={1}
      />
      {data && <AddToCartButton product={data} quantity={quantity} />}
    </div>
  );
};

export default AddToCartQuantity;
