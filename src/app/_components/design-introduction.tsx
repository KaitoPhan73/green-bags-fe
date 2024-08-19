"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";

const DesignIntroduction = () => {
  const router = useRouter();
  return (
    <section className="container mx-auto p-1 rounded-lg bg-gray-50 flex flex-wrap justify-evenly items-center">
      <div className="flex flex-col justify-evenly p-4 max-w-xl gap-12">
        <h3 className="text-2xl font-semibold mb-4">
          Chúng tôi tạo ra nghệ thuật Kiểu dáng thời trang thích hợp cho mọi
          người sử dụng
        </h3>
        <p className="text-gray-700 max-w-xl">
          Chúng tôi tạo ra nghệ thuật Kiểu dáng thời trang thích hợp cho mọi
          người sử dụng
        </p>
        <div className="flex gap-6">
          <div className="h-16 w-16 bg-green-100 rounded-full  flex items-center justify-center">
            <FaPhoneAlt className="h-8 w-8 text-green-300" />
          </div>

          <div className="text-gray-700 max-w-sm">
            <p>0793-022-559</p>
            <p>Gọi cho chúng tôi bất cứ lúc nào</p>
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={() => router.push("/design")}>
            Thiết kế theo phong cách của bạn
            <FaArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-shrink-0">
        <Image
          src="/images/bag-1.jpg"
          alt="bag-1"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default DesignIntroduction;
