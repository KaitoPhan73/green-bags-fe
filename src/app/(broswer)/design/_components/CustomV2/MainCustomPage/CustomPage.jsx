"use client";

import React, { useEffect, useRef } from "react";
import CustomBagV2 from "../Custom";
import { ArrowDownOutlined } from "@ant-design/icons";
import ProductDesign from "./ProductDesign";
import Grid from "@mui/material/Grid";
import { QueryClient, QueryClientProvider } from "react-query";
import useUserStore from "@/store/userStore";
import { useRouter } from "next/navigation";

const queryClient = new QueryClient();

const CustomPage = ({ bags }) => {
  const customBagRef = useRef(null);
  const pageEndRef = useRef(null); // Thêm ref để scroll đến cuối trang
  const { user, loadUserFromLocalStorage } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    loadUserFromLocalStorage();
  }, [loadUserFromLocalStorage]);

  const scrollToBottom = () => {
    if (pageEndRef.current) {
      pageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const scrollToCustomBag = () => {
    if (customBagRef.current) {
      customBagRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {/* Section 1: Design Introduction */}
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
                <h1 className="text-[100px] text-left text-xl font-semibold mb-4 text-red relative z-1">
                  <span className="relative">Thiết kế túi của bạn</span>
                  <br />
                </h1>
                <p className="text-lg mb-8 w-[70%] text-black text-left z-1">
                  Khám phá thế giới túi totee tùy chỉnh với KALBAN – giải pháp
                  trọn gói cho những chiếc túi tote cá nhân hóa với nhiều kiểu
                  dáng, chất liệu và kỹ thuật in khác nhau.
                </p>
                <button
                  onClick={scrollToCustomBag}
                  className="relative group bg-lime-400 text-brown font-medium rounded-lg text-sm px-10 py-3 transition duration-300 ease-in-out hover:bg-lime-500 focus:ring-4 focus:outline-none focus:ring-lime-200 flex items-center justify-center"
                >
                  <span className="pr-2">Bắt đầu thiết kế</span>
                  <ArrowDownOutlined
                    className="group-hover:animate-bounce transition-all duration-500"
                    style={{ fontSize: "18px" }}
                  />
                </button>
              </div>
            </Grid>
          </Grid>
        </div>

        <div
          ref={customBagRef}
          className="flex flex-col items-center justify-center h-[500px]"
        >
          <h1
            onClick={scrollToBottom}
            className="amatic-sc-regular text-[140px] text-center"
          >
            Dành cho bạn,
          </h1>
          <p className="text-center mt-4 max-w-4xl px-4">
            Túi xách không chỉ là một món phụ kiện - Nó sẽ là Signature và
            đồng hành cùng bạn trong mọi hành trình. Hãy biến nó thành một phiên
            bản độc đáo mang dấu ấn riêng của chính mình!!
          </p>
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
            <div>
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
      </div>
    </QueryClientProvider>
  );
};

export default CustomPage;
