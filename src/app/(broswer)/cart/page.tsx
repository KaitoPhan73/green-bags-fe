"use client";
import { Button } from "@/components/ui/button";
import { BadgeX, ChevronRight, DeleteIcon, Minus, Plus } from "lucide-react";
import Empty from "@/components/empty";
import CartItem from "./_components/cart-item";
import useCartStore from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { formatPriceVND } from "@/lib/formatter";
import useUserStore from "@/store/userStore";
import { useEffect } from "react";

const CartPage = () => {
  const { items, clearCart, getTotal } = useCartStore();
  const { user, loadUserFromLocalStorage } = useUserStore();

  useEffect(() => {
    loadUserFromLocalStorage();
  }, [loadUserFromLocalStorage]);

  const router = useRouter();
  return (
    <section className="py-24 relative">
      <div className="container px-4 md:px-5 lg-6 mx-auto">
        <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 ">
          Giỏ hàng của bạn
        </h2>

        {items.length === 0 ? (
          <Empty>
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Giỏ hàng của bạn trống, hãy thêm sản phẩm vào giỏ hàng
            </h1>
            <Button onClick={() => router.push("/products")}>
              Tiếp tục mua sắm
            </Button>
          </Empty>
        ) : (
          <>
            <div className="hidden lg:grid grid-cols-2 py-6">
              <div className="font-normal text-xl leading-8 text-gray-500">
                Sản phẩm
              </div>
              <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
                <span className="w-full max-w-[200px] text-center">
                  Phí vận chuyển
                </span>
                <span className="w-full max-w-[260px] text-center">
                  Số lượng
                </span>
                <span className="w-full max-w-[200px] text-center">Tổng</span>
                <span className="w-full max-w-[100px] text-center">
                  Hành động
                </span>
              </p>
            </div>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
              <div className="flex items-center justify-between w-full mb-6">
                <p className="font-normal text-xl leading-8 text-gray-400 dark:text-white">
                  Tổng tiền hàng
                </p>
                <h6 className="font-semibold text-xl leading-8 text-gray-900 dark:text-white">
                  {formatPriceVND(getTotal())}
                </h6>
              </div>
              <div className="flex items-center justify-between w-full pb-6 border-b border-gray-200">
                <p className="font-normal text-xl leading-8 text-gray-400 dark:text-white">
                  Phí vận chuyển
                </p>
                <h6 className="font-semibold text-xl leading-8 text-gray-900 dark:text-white">
                  {formatPriceVND(0)}
                </h6>
              </div>
              <div className="flex items-center justify-between w-full py-6">
                <p className="font-manrope font-medium text-2xl leading-9 text-gray-900 dark:text-white">
                  Tổng cộng
                </p>
                <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500 dark:text-white">
                  {formatPriceVND(getTotal())}
                </h6>
              </div>
            </div>
            <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
              {/* <button className="rounded-full py-4 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
                <span className="px-2 font-semibold text-lg leading-8 text-indigo-600">
                  Add Coupon Code
                </span>
                <ChevronRight className="w-6 h-6 text-indigo-600" />
              </button> */}
              {user ? (
                user.roleName === "admin" ? (
                  <button
                    className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-gray-400 font-semibold text-lg text-white flex transition-all duration-500 cursor-not-allowed"
                    disabled
                  >
                    Bạn không có quyền thanh toán
                  </button>
                ) : (
                  <button
                    className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700"
                    onClick={() => router.push("/checkout")}
                  >
                    Đi đến trang thanh toán
                    <ChevronRight className="w-6 h-6 " />
                  </button>
                )
              ) : (
                <button
                  className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700"
                  onClick={() => router.push("/login")}
                >
                  Đăng nhập để thanh toán
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CartPage;
