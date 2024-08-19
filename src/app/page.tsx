import Banner from "@/components/banner";
import Image from "next/image";
import AboutUs from "./_components/about-us";
import Services from "./_components/services";
import Testimonials from "./_components/testimonials ";
import Gallery from "./_components/gallery";
import Blog from "./_components/blog";
import ContactUs from "./_components/contact-us";

export default function Home() {
  return (
    <main>
      <Banner />
      <div className="container mx-auto px-0 md:px-6 lg:px-8 mb-12">
        <div>
          <AboutUs />
          <Services />
          <Testimonials />
          <Gallery />
          <Blog />
          <ContactUs />
        </div>
      </div>
    </main>
  );
}
