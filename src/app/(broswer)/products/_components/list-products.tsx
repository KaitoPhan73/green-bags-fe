"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import CardProduct from "./card-product";
import { PaginationView } from "@/components/pagination-view";
import { TProductResponse } from "@/schema/product.schema";

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
  dataSource: TProductResponse[];
  params: {
    page: number;
    limit: number;
  };
};

const ListProducts = ({ dataSource, params }: Props) => {
  return (
    <>
      <div className="grid grid-cols-1  md:grid-cols-2 gap-6 items-center">
        {dataSource.map((item, index) => (
          <CardProduct key={index} item={item} index={index} />
        ))}
      </div>
      <PaginationView
        pageCount={params.page}
        currentPage={params.limit}
        className="my-12"
      />
    </>
  );
};

export default ListProducts;
