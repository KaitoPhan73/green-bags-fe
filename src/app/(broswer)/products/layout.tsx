import React from "react";
import PageTitle from "@/components/page-tittle";
const ProductLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <PageTitle title="Sản phẩm" />
      <div>{children}</div>
    </>
  );
};

export default ProductLayout;
