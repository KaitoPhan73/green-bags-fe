import React, { useRef } from "react";
import CustomBagV2 from "../Custom";
import { ArrowDownOutlined } from "@ant-design/icons";
import ListCustomPublic from "../GetCustom/CustomPublic";
import ProductDesign from "./ProductDesign";
import Grid from '@mui/material/Grid';

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
      <div style={{}}>
        <div className="h-screen flex" style={{ backgroundColor: "#C0C0C0" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ProductDesign />
            </Grid>

            <Grid item xs={6} className="flex flex-col items-center justify-center text-center p-80">
              <div className="max-w-md">
                <div>
                  <h1 className="text-[100px] text-left text-xl font-semibold mb-4 text-red relative z-1">
                    <span className="relative">Custom Your Bag.</span>
                    <br />

                  </h1>
                </div>
                <p className="text-lg mb-8 w-[70%] text-black text-left z-1">
                  Discover the world of custom tote bags with Nghich – your
                  one-stop solution for personalized totes in multiple styles,
                  materials, and print techniques.
                </p>
                <button
                  onClick={scrollToCustomBag}
                  className="bg-lime-400 text-brown font-medium rounded-lg text-sm px-10 py-3 transition duration-300 ease-in-out hover:bg-lime-500"
                >
                  Start Designing <ArrowDownOutlined />
                </button>
              </div>
            </Grid>
          </Grid>
        </div>

        <div className="flex flex-col items-center justify-center h-[500px]">
          <h1 className="amatic-sc-regular text-[140px]  text-black text-center">
            Remember,
          </h1>
          <p className="text-center text-black mt-4 max-w-4xl px-4">
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
        {/* <ListCustomPublic /> */}
      </div>
    </div>
  );
};
export default CustomPage;
