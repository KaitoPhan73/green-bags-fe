import React from "react";
import PageTitle from "@/components/page-tittle";
const ProductLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <PageTitle title="Sản phẩm" />
      {children}
    </div>
  );
};

export default ProductLayout;
