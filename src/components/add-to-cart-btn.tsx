"use client";
import React from "react";
import useCartStore from "../store/cartStore";
import { Button } from "./ui/button";
import { Product } from "@/types/Cart";

interface AddToCartButtonProps {
  product: Product;
  quantity: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  quantity,
}) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Button className="w-full " onClick={() => addItem(product, quantity)}>
      Thêm vào giỏ hàng
    </Button>
  );
};

export default AddToCartButton;