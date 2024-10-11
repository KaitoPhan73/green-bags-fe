"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import CardProduct from "./card-product";
import { PaginationView } from "@/components/pagination-view";
import { TProductResponse } from "@/schema/product.schema";
import PaginationFilter from "@/components/pagination-filter";
import { TTableResponse } from "@/types/Table";

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
  dataSource: TTableResponse<TProductResponse>;
  params: {
    page: number;
    limit: number;
    minPrice: number;
    maxPrice: number;
    name: string;
  };
};

const ListProducts = ({ dataSource, params }: Props) => {
  return (
    <>
      <div className="grid grid-cols-1  md:grid-cols-3 items-center">
        {dataSource.listResult.map((item, index) => (
          <CardProduct key={index} item={item} index={index} />
        ))}
      </div>

      <PaginationFilter page={params.page} totalPage={dataSource.totalPage} />
    </>
  );
};

export default ListProducts;
