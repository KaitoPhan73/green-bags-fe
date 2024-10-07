"use client";
import React, { useEffect, useRef } from "react";
import CustomBagV2 from "../Custom";
import { ArrowDownOutlined } from "@ant-design/icons";
import ListCustomPublic from "../GetCustom/CustomPublic";
import ProductDesign from "./ProductDesign";
import Grid from "@mui/material/Grid";
import { QueryClient, QueryClientProvider } from "react-query";
import useUserStore from "@/store/userStore";
import { useRouter } from "next/navigation";
const queryClient = new QueryClient();

const CustomPage = ({ bags }) => {
  const customBagRef = useRef(null);
  const { user, loadUserFromLocalStorage } = useUserStore();
  useEffect(() => {
    loadUserFromLocalStorage();
  }, [loadUserFromLocalStorage]);

  const router = useRouter();

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
                      <span className="relative">Thiết kế túi của bạn</span>
                      <br />
                    </h1>
                  </div>
                  <p className="text-lg mb-8 w-[70%] text-black text-left z-1">
                    Khám phá thế giới túi tote tùy chỉnh với Nghich – giải pháp
                    trọn gói cho những chiếc túi tote cá nhân hóa với nhiều kiểu
                    dáng, chất liệu và kỹ thuật in khác nhau.
                  </p>
                  <button
                    onClick={scrollToCustomBag}
                    className="bg-lime-400 text-brown font-medium rounded-lg text-sm px-10 py-3 transition duration-300 ease-in-out hover:bg-lime-500"
                  >
                    Bắt đầu thiết kế <ArrowDownOutlined />
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
        {user ? (
          user.roleName === "admin" ? (
            <div className="flex items-center justify-center">
              <button
                className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-gray-400 font-semibold text-lg text-white flex transition-all duration-500 cursor-not-allowed"
                disabled
              >
                Thiết kế chỉ dành cho khách hàng
              </button>
            </div>
          ) : (
            <div ref={customBagRef}>
              <CustomBagV2 bags={bags} />
            </div>
          )
        ) : (
          <div className="flex items-center justify-center">
            <button
              className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700"
              onClick={() => router.push("/login")}
            >
              Vui lòng đăng nhập để thiết kế
            </button>
          </div>
        )}

        <div>{/* <ListCustomPublic /> */}</div>
      </div>
    </QueryClientProvider>
  );
};
export default CustomPage;
