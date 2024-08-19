// components/Blog.jsx
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const posts = [
  {
    title: "Bảo tồn san hô",
    date: "01/08/2024",
    description: "Các biện pháp bảo tồn san hô hiệu quả.",
  },
  {
    title: "Lặn biển an toàn",
    date: "15/07/2024",
    description: "Những điều cần biết khi lặn biển.",
  },
  {
    title: "Khám phá đại dương",
    date: "10/06/2024",
    description: "Những địa điểm lặn biển tuyệt đẹp.",
  },
];

const Blog = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl py-24 ">
          <h2 className="text-2xl text-gray-600 font-sans border-l border-black pl-12 py-4">
            Tin tức & Blog
          </h2>
          <p className="border-l-4 border-black pl-12 text-3xl font-light max-w-md py-4">
            Cập nhập các tin tức mới
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-500">{post.date}</p>
              </CardHeader>
              <CardContent>
                <p>{post.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
