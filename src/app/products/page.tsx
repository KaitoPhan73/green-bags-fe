import React from "react";
import { products, services } from "@/constants/data";
import PageTitle from "@/components/page-tittle";
import { TabTypeProducts } from "./_components/tabs";
import ListProducts from "./_components/list-products";

const page = () => {
  const typeList = [
    { label: "Túi đeo chéo", value: "123" },
    { label: "Túi hư có sẳn", value: "456" },
  ];

  return (
    <div>
      <PageTitle title="Sản phẩm" />
      <section className="pt-12 md:pt-24 lg:pt-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <TabTypeProducts options={typeList} />
          </div>
          <div className="my-12">
            <ListProducts dataSource={products} />
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 md:mx-16 lg:mx-24">
        {/* {services.map((service, index) => (
          <CardService
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))} */}
      </div>
    </div>
  );
};

export default page;
