"use client"

import PageTitle from "@/components/page-tittle";
import CustomPage from "./_components/CustomV2/MainCustomPage/CustomPage";
import React from "react";

const page = () => {
  return (
    <div>
      <PageTitle title="Liên hệ với chúng tôi " />
      <section className="py-12 md:py-24 lg:py-24">
        s
        <div className="container mx-auto px-4 mb-24">
          <h2 className="text-5xl font-sans mb-8 text-center">Tham gia</h2>

          <p className="text-gray-700 text-center text-2xl max-w-4xl mx-auto">
            Gặp chúng tôi để tham gia những cuộc khám phá đại dương
          </p>
        </div>
        <div className="md:mx-12 lg:mx-24">
          <CustomPage/>
        </div>
      </section>
    </div>
  );
};

export default page;
