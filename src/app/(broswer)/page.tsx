import Banner from "@/components/banner";
import AboutUs from "../_components/about-us";
import Services from "../_components/services";
import Gallery from "../_components/gallery";
import Blog from "../_components/blog";
import ContactUs from "../_components/contact-us";
import DesignIntroduction from "../_components/design-introduction";
import { QueryClient, QueryClientProvider } from "react-query";

export default function Home() {
  return (
    <div>
      <Banner />
      <div className="container mx-auto px-0 md:px-6 lg:px-8 mb-12">
        <div>
          <AboutUs />
          <DesignIntroduction />
          <Services />
          {/* <Testimonials /> */}
          <Gallery />
          <Blog />
          <ContactUs />
        </div>
      </div>
    </div>
  );
}
