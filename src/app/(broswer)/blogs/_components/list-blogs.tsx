"use client";
import { MotionDiv } from "@/components/motion-div";
import { Button } from "@/components/ui/button";
import { Variants } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import CardBlog from "./card-blog";
import { dataBlogs } from "@/constants/data";
const Blogs = () => {
  const router = useRouter();

  const getCardVariants = (index: number): Variants => {
    return {
      offscreen: {
        x: index % 2 === 0 ? -200 : 200,
        opacity: 0,
      },
      onscreen: {
        x: 0,
        opacity: 1,
        transition: {
          type: "spring",
          bounce: 0.4,
          duration: 2,
        },
      },
    };
  };

  return (
    <section className="py-12 md:py-24 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl py-12 md:py-24 lg:py-24 ">
          <h2 className="text-2xl text-gray-600 font-sans border-l border-black dark:text-white dark:border-white pl-12 py-4">
            Bài viết & Tin tức
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {dataBlogs.map((item, index) => (
            <CardBlog
              key={index}
              image={item.image}
              name={item.name}
              description={item.description}
              createdDate={item.createdDate}
              link={`/blogs/${item.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
