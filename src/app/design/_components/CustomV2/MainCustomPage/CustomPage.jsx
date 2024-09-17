import React, { useRef } from "react";
import CustomBagV2 from "../Custom";
import { ArrowDownOutlined } from "@ant-design/icons";
import ListCustomPublic from "../GetCustom/CustomPublic";

const CustomPage = () => {
  const customBagRef = useRef(null);

  const scrollToElement = (element) => {
    const startY = window.pageYOffset;
    const targetY = element.getBoundingClientRect().top + startY;
    const distance = targetY - startY;
    const duration = 1000; // Duration in milliseconds
    let startTime = null;

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animateScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutCubic(timeElapsed / duration) * distance + startY;
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animateScroll);
    };

    requestAnimationFrame(animateScroll);
  };

  const scrollToCustomBag = () => {
    if (customBagRef.current) {
      scrollToElement(customBagRef.current);
    }
  };
  return (
    <div>
      <div style={{ backgroundColor: "#FF78C5" }}>
        <div className=" h-screen flex ">
          {/* Left Section with Image */}
          <div className="w-[45%] flex  justify-center">
            <img
              src="/images/Banner/bannerCustomize.jpg"
              alt="Custom Bag"
              className="max-h-full object-cover"
            />
          </div>
          {/* Right Section with Text and Button */}
          <div className="w-[55%] flex flex-col items-center justify-center text-center p-8">
            <div className="max-w-md">
              <div>
                <h1 className="text-[60px] text-left font-semibold mb-4 text-black relative z-10">
                  <span className="relative z-20">
                    Custo<span className="text-white relative z-30">m</span>
                  </span>
                  <br />
                  <span className="relative z-20">Your Bag.</span>
                  <div className="absolute bottom-28 left-[170px] w-[130px] h-[130px] bg-black z-0"></div>
                </h1>
              </div>
              <p className="text-lg mb-8 w-[70%] text-black text-left">
                Discover the world of custom tote bags with Nghich – your
                one-stop solution for personalized totes in multiple styles,
                materials, and print techniques.
              </p>
              <button
                onClick={scrollToCustomBag}
                className="bg-lime-400 text-black font-medium rounded-lg text-sm px-10 py-3 transition duration-300 ease-in-out hover:bg-lime-500"
              >
                Start Designing <ArrowDownOutlined />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center h-[500px]">
          <h1 className="amatic-sc-regular text-[140px]  text-white text-center">
            Remember,
          </h1>
          <p className="text-center text-white mt-4 max-w-4xl px-4">
            REMEMBER, YOUR BAG IS MORE THAN JUST AN ACCESSORY—IT’S AN EXTENSION
            OF YOUR STYLE AND PERSONALITY. WHETHER YOU OPT FOR MONOGRAMS, STRAP
            CUSTOMIZATION, OR BESPOKE DESIGNS, MAKE IT UNIQUELY YOURS!
          </p>
        </div>
      </div>
      <div ref={customBagRef}>
        <CustomBagV2 />
      </div>
      <div>
        <ListCustomPublic />
      </div>
    </div>
  );
};
export default CustomPage;
