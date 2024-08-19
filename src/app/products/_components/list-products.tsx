"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import CardProduct from "./card-product";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  color: string;
  size: string;
  image: string;
};

type Props = {
  dataSource: Product[];
};

const ListProducts = ({ dataSource }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-6 items-center">
      {dataSource.map((item, index) => (
        <CardProduct key={index} item={item} index={index} />
      ))}
    </div>
  );
};

export default ListProducts;
