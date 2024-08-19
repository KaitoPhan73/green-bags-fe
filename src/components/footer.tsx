import Image from "next/image";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { MdOutlineMail } from "react-icons/md";
const Footer = () => {
  return (
    <footer className="bg-neutral-50 text-black pt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold mb-4">
              Trải nghiệm tuyệt vời với Kalban
            </h2>
            <div className="flex">
              <Icon className="h-32 w-32" />
              <div className="flex items-center">
                <p className="text-lg max-w-xl ">
                  Khám phá vẻ đẹp của các sản phẩm túi xanh và những thiết kế
                  độc đáo. Chúng tôi cung cấp thông tin chi tiết và hướng dẫn
                  lựa chọn các túi phù hợp nhất cho nhu cầu của bạn.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 md:mt-0">
            <h3 className="text-2xl font-semibold mb-4">Thương hiệu Kalban</h3>
            <ul>
              <li>
                <div className="flex gap-2">
                  <div className="h-16 w-16 flex items-center justify-center">
                    <FaPhoneAlt className="h-6 w-6 text-green-400" />
                  </div>

                  <div className="flex flex-col  justify-center">
                    <p className="text-gray-700">0793-022-559</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex gap-2">
                  <div className="h-16 w-16 flex items-center justify-center">
                    <GrMapLocation className="h-6 w-6 text-green-400" />
                  </div>

                  <div className="flex flex-col  justify-center">
                    <p className="text-gray-700">
                      125, Nguyen Cuu Van, Binh Thanh{" "}
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex gap-2">
                  <div className="h-16 w-16 flex items-center justify-center">
                    <MdOutlineMail className="h-6 w-6 text-green-400" />
                  </div>

                  <div className="flex flex-col  justify-center">
                    <p className="text-gray-700">khaithinhvui2003@gmail.com</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="mt-8 md:mt-0">
            <h3 className="text-2xl font-semibold mb-4">
              Kết Nối Với Chúng Tôi
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-700 hover:text-blue-500">
                <FaFacebook />
              </a>
              <a href="#" className="text-blue-700 hover:text-blue-500">
                <FaTwitter />
              </a>
              <a href="#" className="text-pink-700 hover:text-pink-500">
                <FaInstagram />
              </a>
              <a href="#" className="text-red-700 hover:text-red-500">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center border-t border-black py-8">
          <p>&copy; 2024 Khám Phá Biển và San Hô. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
function Icon(props: any) {
  return (
    <div className="flex items-center">
      <Image
        priority
        src="/svgs/kalban-logo.svg"
        height={32}
        width={32}
        alt="Kalban-logo"
        {...props}
      />
    </div>
  );
}
export default Footer;
