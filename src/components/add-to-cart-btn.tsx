"use client";
import React from "react";
import useCartStore from "../store/cartStore";
import { Button } from "./ui/button";
import { TProductResponse } from "@/schema/product.schema";

interface AddToCartButtonProps {
  product: TProductResponse;
  quantity: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  quantity,
}) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Button className="w-1/2 " onClick={() => addItem(product, quantity)}>
      Thêm vào giỏ hàng
    </Button>
  );
};

export default AddToCartButton;
