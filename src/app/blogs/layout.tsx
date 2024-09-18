import React from "react";
import PageTitle from "@/components/page-tittle";
const BlogLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <PageTitle title="Blog" />
      <section className="py-12 md:py-12 lg:py-12"> {children}</section>
    </div>
  );
};

export default BlogLayout;
