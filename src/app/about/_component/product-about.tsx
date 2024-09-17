"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import { useMediaQuery } from "usehooks-ts";
const ProductAbout = () => {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  const sectionStyle = isDesktop
    ? {}
    : {
        backgroundImage: "url('/images/bag-2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
  return (
    <section
      className="container mx-auto p-4 md:p-8 bg-gray-50 rounded-lg flex flex-col md:flex-row flex-wrap justify-between items-center
      bg-cover bg-center bg-no-repeat md:bg-none"
      style={sectionStyle}
    >
      <div className="flex-shrink-0 mt-8 md:mt-0 hidden md:block">
        <Image
          src="/images/bag-2.jpg"
          alt="bag-1"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>
      <div className="flex flex-col justify-evenly p-4 max-w-xl gap-4 md:gap-8 bg-white bg-opacity-80 md:bg-transparent rounded-md">
        <p className="text-gray-700">Kết quả cuối cùng</p>
        <p className="text-gray-700">
          Chúng tôi đảm bảo bạn nhận được những chiếc túi vải chất lượng cao,
          được thiết kế độc đáo, phản ánh nhu cầu về phong cách và độ bền của
          bạn.
        </p>
        <div className="flex justify-center md:justify-start">
          <Button onClick={() => router.push("/design")}>
            Sản phẩm của chúng tôi
            <FaArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductAbout;
