import React from "react";
import { products, services } from "@/constants/data";
import { TabTypeProducts } from "./_components/tabs";
import ListProducts from "./_components/list-products";
import { getAllProducts } from "@/api/product";

const page = async (props: any) => {
  const typeList = [
    { label: "Túi đeo chéo", value: "123" },
    { label: "Túi hư có sẳn", value: "456" },
  ];
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    limit: props.searchParams.limit ? +props.searchParams.limit : 10,
  };
  const response = await getAllProducts(params);
  console.log(response.payload);
  return (
    <div>
      <section className="pt-12 md:pt-24 lg:pt-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <TabTypeProducts options={typeList} />
          </div>
          <div className="my-12">
            <ListProducts
              dataSource={response.payload.listResult}
              params={params}
            />
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
