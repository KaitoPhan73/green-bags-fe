import PageTitle from "@/components/page-tittle";
import CustomPage from "./_components/CustomV2/MainCustomPage/CustomPage";
import React from "react";
import { getAllProducts } from "@/api/product";
const page = async () => {
  const data = await getAllProducts({ page: 1, limit: 100 });

  return (
    <div>
      <PageTitle title="Liên hệ với chúng tôi " />
      <section className="py-12 md:py-24 lg:py-24">
        <div className="md:mx-12 lg:mx-24">
          <CustomPage bags={data.payload.listResult} />
        </div>
      </section>
    </div>
  );
};

export default page;
