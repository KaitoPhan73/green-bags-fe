"use client";
import { Button } from "@/components/ui/button";
import { homepageList, services } from "@/constants/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use } from "react";
import { FaArrowRight } from "react-icons/fa";
const Services = () => {
  const router = useRouter();
  return (
    <div>
      <div className="max-w-4xl py-12 md:py-24 lg:py-24 ">
        <h2 className="text-2xl text-gray-600 font-sans border-l border-black pl-12 py-4">
          Trang web của chúng tôi có những gì?
        </h2>
        <p className="border-l-4 border-black pl-12 text-3xl font-light max-w-md py-4">
          Các dịch vụ mà bạn sẽ được trải nghiệm khi đến với chúng tôi.
        </p>
      </div>

      <div className="container mx-auto p-1 rounded-lg bg-gray-50">
        {homepageList.map((item, index) => (
          <section className=" py-2" key={index}>
            <div className="grid grid-cols-1 gap-8">
              <div
                className={`flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                } items-center p-2`}
              >
                <div className="md:w-1/2 p-4 max-w-xl">
                  <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-gray-700 max-w-xl">{item.description}</p>
                  <div className="mt-4">
                    <Button onClick={() => router.push(item.link)}>
                      Xem thêm
                      <FaArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/2 p-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={500}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Services;
