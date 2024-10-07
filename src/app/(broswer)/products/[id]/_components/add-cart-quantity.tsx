"use client";
import AddToCartButton from "@/components/add-to-cart-btn";
import { Input } from "@/components/ui/input";
import { TProductResponse } from "@/schema/product.schema";

import React, { useState } from "react";
type Props = {
  data: TProductResponse;
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
        max={data.stock}
      />
      {data && <AddToCartButton product={data} quantity={quantity} />}
    </div>
  );
};

export default AddToCartQuantity;
