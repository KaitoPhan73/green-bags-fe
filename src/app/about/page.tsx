"use client";
import PageTitle from "@/components/page-tittle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import ProductAbout from "./_component/product-about";
import ContactForm from "./_component/form-contact";

const page = () => {
  return (
    <div>
      <PageTitle title="Về chúng tôi" />
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 flex justify-center flex-col items-center gap-12">
        <div className="flex flex-col justify-evenly max-w-3xl border-solid border-[2rem] p-8 rounded-3xl items-center bg-white ">
          <div className="flex flex-col justify-evenly items-center space-y-4 md:space-y-8  rounded-3xl">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Sứ mệnh</h3>
            <p className="text-gray-700 text-center">
              Chúng tôi truyền cảm hứng cho lối sống có ý thức bằng cách tạo ra
              những vật dụng thân thiện với môi trường được cá nhân hóa, giúp
              bạn thể hiện bản thân và hướng tới một tương lai không có nhựa
            </p>
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Tầm nhìn</h3>
            <p className="text-gray-700 text-center">
              Sống bền vững không chỉ là lựa chọn, mà còn là cách thể hiện bản
              thân đầy màu sắc và cá tính
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-evenly max-w-md space-y-2 md:space-y-4 items-center bg-white bg-opacity-80 md:bg-transparent">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">
            Chúng tôi làm gì
          </h3>
          <p className="text-gray-700 text-center">
            Chúng tôi chuyên về túi vải tùy chỉnh, cung cấp các thiết kế độc đáo
            và tay nghề chất lượng cao để đáp ứng nhu cầu cụ thể của từng khách
            hàng.
          </p>
          <div className="mt-4 flex justify-center md:justify-start">
            <Button>
              Thiết kế ngay
              <FaArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <ProductAbout />
        <ContactForm />
      </div>
    </div>
  );
};

export default page;
