import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const testimonials = [
  {
    name: "Nguyễn Văn Tùng",
    feedback: "Trải nghiệm tuyệt vời! Tôi đã học được rất nhiều điều.",
    image:
      "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
  },
  {
    name: "Lê Tuấn Anh",
    feedback: "Dịch vụ chuyên nghiệp và thân thiện.",
    image:
      "https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg",
  },
  {
    name: "Nguyễn Thị Kiều Loan",
    feedback: "Môi trường biển rất đẹp và phong phú.",
    image:
      "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 ">
        <div className="max-w-4xl py-24 ">
          <h2 className="text-2xl text-gray-600 font-sans border-l border-black pl-12 py-4">
            Nhưng gì khách hàng nói về chúng tôi
          </h2>
          <p className="border-l-4 border-black pl-12 text-3xl font-light max-w-md py-4">
            Cảm nhận từ những khách hàng đã trải nghiệm dịch vụ của chúng tôi.
          </p>
        </div>
        {testimonials.map((testimonial, index) => (
          <section className=" py-2" key={index}>
            <div className="grid grid-cols-1 gap-8">
              <div className="flex flex-col md:flex-row items-center p-2">
                <div className="md:w-1/2 p-4 ">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={400}
                    height={400}
                    className="rounded-lg"
                  />
                </div>
                <div className="md:w-1/2 p-4">
                  <h3 className="text-2xl font-semibold mb-4">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-700">{testimonial.feedback}</p>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
