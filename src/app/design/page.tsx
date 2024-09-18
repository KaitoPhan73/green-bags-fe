"use client"

import PageTitle from "@/components/page-tittle";
import CustomPage from "./_components/CustomV2/MainCustomPage/CustomPage";
import React from "react";

const page = () => {
  return (
    <div>
      <PageTitle title="Liên hệ với chúng tôi " />
      <section className="py-12 md:py-24 lg:py-24">
        <div className="md:mx-12 lg:mx-24">
          <CustomPage/>
        </div>
      </section>
    </div>
  );
};

export default page;
