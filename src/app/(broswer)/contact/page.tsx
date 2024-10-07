import PageTitle from "@/components/page-tittle";
import React from "react";
import ContactForm from "./_components/form-contact";

const page = () => {
  return (
    <div>
      <PageTitle title="Liên hệ với chúng tôi " />
      <section className="py-12 md:py-24 lg:py-24">
        
        {/* <div className="container mx-auto px-4 mb-24">
          <h2 className="text-5xl font-sans mb-8 text-center">Tham gia</h2>

          <p className="text-gray-700 text-center text-2xl max-w-4xl mx-auto">
            Gặp chúng tôi để tham gia những cuộc khám phá đại dương
          </p>
        </div> */}
        <div className="md:mx-12 lg:mx-24">
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default page;
