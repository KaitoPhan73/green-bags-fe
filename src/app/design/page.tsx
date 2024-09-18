"use client"

import PageTitle from "@/components/page-tittle";
import CustomPage from "./_components/CustomV2/MainCustomPage/CustomPage";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const page = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <PageTitle title="Liên hệ với chúng tôi " />
        <section className="py-12 md:py-24 lg:py-24">
          <div className="md:mx-12 lg:mx-24">
            <CustomPage />
          </div>
        </section>
      </QueryClientProvider>

    </div>
  );
};

export default page;
