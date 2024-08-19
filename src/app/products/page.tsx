import React from "react";
import { services } from "@/constants/data";
import PageTitle from "@/components/page-tittle";

const page = () => {
  return (
    <div>
      <PageTitle title="Dịch vụ" />
      <section className="py-12 md:py-24 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-sans mb-8 text-center">
            Dịch vụ của chúng tôi
          </h2>

          <p className="text-gray-700 text-center text-2xl max-w-4xl mx-auto">
            Chúng tôi là công ty chuyên cung cấp các trải nghiệm lặn biển và
            khám phá san hô hàng đầu. Sứ mệnh của chúng tôi là bảo tồn và giới
            thiệu vẻ đẹp của đại dương đến mọi người.
          </p>
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
