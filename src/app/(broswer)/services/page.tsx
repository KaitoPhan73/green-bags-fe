"use client";

import React from "react";
import PageTitle from "@/components/page-tittle";
import Services from "@/app/_components/services";
const page = () => {
  return (
    <div className="container mx-auto px-0 md:px-6 lg:px-8 mb-12">
      <PageTitle title="Dịch Vụ" />
      <div className="container mx-auto px-0 md:px-6 lg:px-8 mb-12"></div>
      <Services />
    </div>
  );
};

export default page;
