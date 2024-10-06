import React, { useRef } from "react";
import CustomBagV2 from "../Custom";
import { ArrowDownOutlined } from "@ant-design/icons";
import ListCustomPublic from "../GetCustom/CustomPublic";
import ProductDesign from "./ProductDesign";
import Grid from "@mui/material/Grid";

const CustomPage = () => {
  const customBagRef = useRef(null);

  const scrollToElement = (element) => {
    // console.log("Scrolling to element:", element);

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
    // console.log(customBagRef.current);
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

            <Grid
              item
              xs={6}
              className="flex flex-col items-center justify-center text-center p-80"
            >
              <div className="max-w-md">
                <div>
                  <h1 className="text-[100px] text-left text-xl font-semibold mb-4 text-red relative z-1">
                    <span className="relative">THIẾT KẾ TÚI THEO Ý TƯỞNG CỦA BẠN.</span>
                    <br />
                  </h1>
                </div>
                <p className="text-lg mb-8 w-[70%] text-black text-left z-1">
                Khám phá thế giới túi tote tùy chỉnh với KALBAN – giải pháp toàn diện của bạn cho những chiếc túi cá nhân hóa với nhiều kiểu dáng, chất liệu và kỹ thuật in ấn khác nhau.
                </p>
                <button
                  onClick={scrollToCustomBag}
                  className="bg-lime-400 text-brown font-medium rounded-lg text-sm px-10 py-3 transition duration-300 ease-in-out hover:bg-lime-500"
                >
                  Bắt Đầu Thiết Kế <ArrowDownOutlined />
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
            SỰ PHẢN ÁNH PHONG CÁCH VÀ CÁ TÍNH CỦA BẠN. DÙ BẠN CHỌN MONOGRAM, TÙY
            CHỈNH DÂY ĐEO HAY THIẾT KẾ RIÊNG, HÃY BIẾN NÓ THÀNH MỘT PHIÊN BẢN
            ĐỘC ĐÁO CỦA BẠN!
          </p>
        </div>
      </div>
      <div style={{ minHeight: "500px" }} ref={customBagRef}>
        <CustomBagV2 />
      </div>
      <div>{/* <ListCustomPublic /> */}</div>
    </div>
  );
};
export default CustomPage;
