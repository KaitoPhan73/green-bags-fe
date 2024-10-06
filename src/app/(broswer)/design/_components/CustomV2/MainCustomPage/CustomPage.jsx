"use client";
import React, { useRef } from "react";
import CustomBagV2 from "../Custom";
import { ArrowDownOutlined } from "@ant-design/icons";
import ListCustomPublic from "../GetCustom/CustomPublic";
import ProductDesign from "./ProductDesign";
import Grid from "@mui/material/Grid";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const CustomPage = ({ bags }) => {
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
    <QueryClientProvider client={queryClient}>
      <div>
        <div style={{}}>
          <div className="h-screen flex" style={{ backgroundColor: "#C0C0C0" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ProductDesign />
              </Grid>

              <Grid
                item
                xs={6}
                className="flex flex-col items-center justify-center text-center p-80"
              >
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
            <h1 className="amatic-sc-regular text-[140px]  text-center">
              Lưu ý,
            </h1>
            <p className="text-center  mt-4 max-w-4xl px-4">
              HÃY NHỚ RẰNG, TÚI XÁCH CỦA BẠN KHÔNG CHỈ LÀ MỘT PHỤ KIỆN—NÓ CÒN LÀ
              SỰ PHẢN ÁNH PHONG CÁCH VÀ CÁ TÍNH CỦA BẠN. DÙ BẠN CHỌN MONOGRAM,
              TÙY CHỈNH DÂY ĐEO HAY THIẾT KẾ RIÊNG, HÃY BIẾN NÓ THÀNH MỘT PHIÊN
              BẢN ĐỘC ĐÁO CỦA BẠN!
            </p>
          </div>
        </div>
        <div ref={customBagRef}>
          <CustomBagV2 bags={bags} />
        </div>
        <div>{/* <ListCustomPublic /> */}</div>
      </div>
    </QueryClientProvider>
  );
};
export default CustomPage;
