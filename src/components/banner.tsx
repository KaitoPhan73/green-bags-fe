"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
export default function Banner() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const handleMouseLeave = () => {
    plugin.current.play();
  };

  const items = [
    {
      title: "San Hô",
      description:
        "San hô là loài sinh vật biển có cấu trúc phức tạp, sống thành cụm và tạo nên rạn san hô. Chúng đóng vai trò quan trọng trong hệ sinh thái biển.",
      image: "/images/san-ho-tho-lan.jpg",
      link: "@/",
    },
    {
      title: "San Hô Đỏ",
      description:
        "San hô đỏ là một trong những loài san hô được biết đến nhiều nhất nhờ màu sắc nổi bật và giá trị thương mại cao.",
      image: "/images/san-ho-cam.jpg",
      link: "https://vi.wikipedia.org/wiki/San_hô_đỏ",
    },
    {
      title: "San Hô Xanh",
      description:
        "San hô xanh, mặc dù ít phổ biến hơn, nhưng cũng đóng vai trò quan trọng trong việc duy trì sự cân bằng sinh thái của rạn san hô.",
      image: "/images/san-ho-xanh.jpg",
      link: "https://vi.wikipedia.org/wiki/San_hô_xanh",
    },
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={handleMouseLeave}
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <section className="bg-gray-50 dark:bg-gray-800 py-20">
              <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="order-2 md:order-1">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                      {item.title}
                    </h2>
                    <p className="text-lg md:text-xl mb-6 text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                    <Button className="bg-black text-white py-3 px-6 rounded-lg">
                      Learn More
                    </Button>
                  </div>
                  <div className="order-1 md:order-2">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={500}
                      height={500}
                      className="object-cover w-full rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </section>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 h-16 w-16 bg-gray-100 bg-opacity-50 rounded-lg " />
      <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 h-16 w-16 bg-gray-100 bg-opacity-50 rounded-lg " /> */}
    </Carousel>
  );
}
