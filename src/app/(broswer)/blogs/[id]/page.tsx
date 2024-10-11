import React from "react";
import { dataBlogs } from "@/constants/data";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const BlogDetail = ({ params }: { params: { id: string } }) => {
  const blog = dataBlogs.find((blog) => blog.id === Number(params.id));

  if (!blog) {
    return <div>Blog không tồn tại.</div>;
  }

  const allTags = blog.posts.reduce<string[]>((acc, post) => {
    acc.push(...post.tags);
    return acc;
  }, []);

  return (
    <div className="p-4 mx-64">
      <div className="grid grid-cols-3 gap-28">
        {/* Phần chính của blog */}
        <div className="col-span-2">
          <div className="mb-4">
            <h2 className="text-5xl text-opacity-85 font-bold mb-4">
              {blog.name}
            </h2>
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
              <Image
                src={blog.image}
                alt={blog.name}
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
              />
            </div>
            <div className="text-right mt-2">
              <span className="text-sm text-gray-500 dark:text-white">
                {blog.createdDate}
              </span>
            </div>
          </div>

          {/* Render các posts */}
          <div className="my-16">
            {blog.posts.map((post, index) => (
              <div key={post.id} className="">
                <h3 className="text-xl font-bold my-4">
                  {index + 1}. {post.title}
                </h3>
                <p className="my-6">{post.content}</p>
                <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-1">
          <div className="sticky top-20">
            {/* Đảm bảo giá trị top phù hợp */}
            <div className="">
              <h3 className="text-3xl font-extralight mb-4">Tin mới nhất</h3>
              <div>
                {dataBlogs
                  .filter((item) => item.id !== blog.id)
                  .slice(0, 3)
                  .map((item) => (
                    <div key={item.id} className="mb-4">
                      <h2 className="text-lg font-semibold my-2">{item.name}</h2>
                      <div className="text-right mt-2">
                        <span className="text-sm text-gray-500 dark:text-white">
                          {item.createdDate}
                        </span>
                      </div>
                      <Separator className="my-4" />
                    </div>
                  ))}
              </div>

              {/* Render tags */}
              <div>
                <h3 className="text-2xl font-bold mb-4">Tags</h3>
                <div className="grid grid-cols-2 gap-2">
                  {allTags.map((tag, index) => (
                    <div key={index} className="mb-1">
                      <Button>{tag}</Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
