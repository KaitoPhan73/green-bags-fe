import { Button } from "@/components/ui/button";
import { BadgeX, ChevronRight, DeleteIcon, Minus, Plus } from "lucide-react";
import Image from "next/image";

function page() {
  return (
    <section className="py-24 relative">
      <div className="container px-4 md:px-5 lg-6 mx-auto">
        <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-black">
          Giỏ hàng của bạn
        </h2>
        <div className="hidden lg:grid grid-cols-2 py-6">
          <div className="font-normal text-xl leading-8 text-gray-500">
            Product
          </div>
          <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
            <span className="w-full max-w-[200px] text-center">
              Delivery Charge
            </span>
            <span className="w-full max-w-[260px] text-center">Quantity</span>
            <span className="w-full max-w-[200px] text-center">Total</span>
            <span className="w-full max-w-[100px] text-center">Action</span>
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
          <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
            <div className="img-box">
              <Image
                src="https://i.pinimg.com/736x/12/48/b3/1248b306c4af4ac31e851fc1c213fda3.jpg"
                alt="perfume bottle image"
                width={140}
                height={140}
                className="xl:w-[140px]"
              />
            </div>
            <div className="pro-data w-full max-w-sm ">
              <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">
                Latest N-5 Perfuam
              </h5>
              <p className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                Perfumes
              </p>
              <h6 className="font-medium text-lg leading-8 text-indigo-600  max-[550px]:text-center">
                $120.00
              </h6>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <h6 className="font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center">
              $15.00{" "}
              <span className="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap">
                (Delivery Charge)
              </span>
            </h6>
            <div className="flex items-center w-full mx-auto justify-center">
              <button className="group rounded-l-full px-5 py-5 border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                <Minus className="w-5 h-5" />
              </button>
              <input
                type="text"
                className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[100px] min-w-[80px] placeholder:text-gray-900 py-4 text-center bg-transparent"
                defaultValue={1}
              />
              <button className="group rounded-r-full px-5 py-5 border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
              $120.00
            </h6>
            <div className="min-w-[100px] flex justify-center items-center">
              <BadgeX className="w-10 h-10 text-destructive cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
          <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
            <div className="img-box">
              <Image
                src="https://i.pinimg.com/736x/12/48/b3/1248b306c4af4ac31e851fc1c213fda3.jpg"
                alt="perfume bottle image"
                width={140}
                height={140}
                className="xl:w-[140px]"
              />
            </div>
            <div className="pro-data w-full max-w-sm ">
              <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">
                Latest N-5 Perfuam
              </h5>
              <p className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                Perfumes
              </p>
              <h6 className="font-medium text-lg leading-8 text-indigo-600  max-[550px]:text-center">
                $120.00
              </h6>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <h6 className="font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center">
              $15.00{" "}
              <span className="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap">
                (Delivery Charge)
              </span>
            </h6>
            <div className="flex items-center w-full mx-auto justify-center">
              <button className="group rounded-l-full px-5 py-5 border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                <Minus className="w-5 h-5" />
              </button>
              <input
                type="text"
                className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[100px] min-w-[80px] placeholder:text-gray-900 py-4 text-center bg-transparent"
                defaultValue={1}
              />
              <button className="group rounded-r-full px-5 py-5 border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
              $120.00
            </h6>
            <div className="min-w-[100px] flex justify-center items-center">
              <BadgeX className="w-10 h-10 text-destructive cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
          <div className="flex items-center justify-between w-full mb-6">
            <p className="font-normal text-xl leading-8 text-gray-400">
              Sub Total
            </p>
            <h6 className="font-semibold text-xl leading-8 text-gray-900">
              $360.00
            </h6>
          </div>
          <div className="flex items-center justify-between w-full pb-6 border-b border-gray-200">
            <p className="font-normal text-xl leading-8 text-gray-400">
              Delivery Charge
            </p>
            <h6 className="font-semibold text-xl leading-8 text-gray-900">
              $45.00
            </h6>
          </div>
          <div className="flex items-center justify-between w-full py-6">
            <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">
              Total
            </p>
            <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">
              $405.00
            </h6>
          </div>
        </div>
        <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
          <button className="rounded-full py-4 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
            <span className="px-2 font-semibold text-lg leading-8 text-indigo-600">
              Add Coupon Code
            </span>
            <ChevronRight className="w-6 h-6 text-indigo-600" />
          </button>
          <button className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700">
            <span className="px-2">Continue to Payment</span>
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default page;
