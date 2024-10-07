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
    <footer className="bg-neutral-50 dark:bg-gray-900 ">
      <div className="flex flex-col md:flex-row justify-between items-start border-t-b border-black py-8 px-12 bg-gray-100 dark:bg-gray-800">
        <div className="text-center md:text-left md:w-2/5">
          <div className="flex items-center">
            <Icon className="h-32 w-64 dark:filter dark:invert" />
            <div className="text-lg max-w-xl ml-4">
              <h2 className="text-3xl font-semibold mb-4">
                Trải nghiệm tuyệt vời với KALBAN
              </h2>
              <p>
                Khám phá vẻ đẹp của các sản phẩm túi xanh và những thiết kế độc
                đáo. Chúng tôi cung cấp thông tin chi tiết và hướng dẫn lựa chọn
                các túi phù hợp nhất cho nhu cầu của bạn.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-0 md:w-1/5">
          <h3 className="text-2xl font-semibold mb-4">Thương hiệu KALBAN</h3>
          <ul>
            <li className="flex gap-2 items-center mb-2">
              <FaPhoneAlt className="h-6 w-6 text-green-400" />
              <p className="text-gray-700 dark:text-white">0976-325-953</p>
            </li>
            <li className="flex gap-2 items-center mb-2">
              <GrMapLocation className="h-6 w-6 text-green-400" />
              <p className="text-gray-700 dark:text-white">
              FPT University HCMC,
              Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh 700000              </p>
            </li>
            <li className="flex gap-2 items-center mb-2">
              <MdOutlineMail className="h-6 w-6 text-green-400" />
              <p className="text-gray-700 dark:text-white">
                longdhpse171112@fpt.edu.vn
              </p>
            </li>
          </ul>
        </div>
        <div className="mt-8 md:mt-0 md:w-1/5">
          <h3 className="text-2xl font-semibold mb-4">Kết Nối Với Chúng Tôi</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-700 hover:text-blue-500">
              <FaFacebook />
            </a>
            {/* <a href="#" className="text-blue-700 hover:text-blue-500">
              <FaTwitter />
            </a> */}
            <a href="#" className="text-pink-700 hover:text-pink-500">
              <FaInstagram />
            </a>

          </div>
        </div>
      </div>
      <div className=" text-center border-t border-black py-8">
        <p>
          &copy; 2024 Khám Phá Các Mẫu Túi Có Sẵn Và Tự Lên Ý Tưởng. Sáng Tạo
          Nào!
        </p>
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
