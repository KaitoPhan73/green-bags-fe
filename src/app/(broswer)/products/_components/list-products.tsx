"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import CardProduct from "./card-product";
import { PaginationView } from "@/components/pagination-view";

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
  const currentPage = 5; // Ví dụ: Trang hiện tại
  const pageCount = 10; // Tổng số trang
  return (
    <>
      <div className="grid grid-cols-1  md:grid-cols-2 gap-6 items-center">
        {dataSource.map((item, index) => (
          <CardProduct key={index} item={item} index={index} />
        ))}
      </div>
      <PaginationView
        pageCount={pageCount}
        currentPage={currentPage}
        className="my-12"
      />
    </>
  );
};

export default ListProducts;
