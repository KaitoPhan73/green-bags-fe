import React from "react";
import { dataBlogs } from "@/constants/data";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
const BlogDetail = ({ params }: { params: { id: string } }) => {
  // Tìm blog dựa trên id từ params
  const blog = dataBlogs.find((blog) => blog.id === Number(params.id));

  if (!blog) {
    return <div>Blog không tồn tại.</div>;
  }
  const allTags = blog.posts.reduce((acc, post) => {
    acc.push(...post.tags);
    return acc;
  }, []);
  return (
    <div className="p-4 mx-64">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="mb-4">
            <h2 className="text-3xl font-bold mb-4">{blog.name}</h2>
            <div className="relative h-72 w-full rounded-2xl">
              <Image
                src={blog.image}
                alt={blog.name}
                layout="fill"
                className="w-full h-full rounded-2xl"
              />
            </div>
            <div className="text-right mt-2">
              <span className="text-sm text-gray-500 dark:text-white">
                {blog.createdDate}
              </span>
            </div>
          </div>

          <div className="my-16">
            {blog.posts.map((item, index) => (
              <div key={index} className="">
                <h3 className="text-xl font-bold my-4">
                  {index + 1}. {item.title}
                </h3>
                <p className="my-6 text-mb">{item.content}</p>
                <div key={index} className="relative h-72 w-full rounded-2xl">
                  <Image
                    src={blog.image}
                    alt={blog.name}
                    layout="fill"
                    className="w-full h-full rounded-2xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1 flex justify-center">
          <div className="">
            <h3 className="text-xl font-extralight mb-4">Tin mới nhất</h3>
            <div>
              {dataBlogs
                .filter((item) => item.id !== blog.id)
                .slice(0, 3)
                .map((item, index) => (
                  <div key={index} className="mb-4">
                    <h2 className="text-xl font-semibold my-2">{item.name}</h2>
                    <div className="text-right mt-2">
                      <span className="text-sm text-gray-500 dark:text-white">
                        {item.createdDate}
                      </span>
                    </div>
                    <Separator className="my-4" />
                  </div>
                ))}
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Tags</h3>
              <div className="grid grid-cols-2 gap-2">
                {allTags.map((item, index) => (
                  <div key={index} className="mb-4">
                    <Button>{item}</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
