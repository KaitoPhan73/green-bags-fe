import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-neutral-100 text-black pt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold mb-4">
              Khám Phá Biển và San Hô
            </h2>
            <p className="text-lg mb-4 max-w-xl">
              Khám phá vẻ đẹp của biển xanh và những rạn san hô tuyệt vời. Chúng
              tôi cung cấp thông tin và hướng dẫn chi tiết cho các điểm đến
              tuyệt vời nhất.
            </p>
            <a
              href="#contact"
              className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600"
            >
              Liên Hệ
            </a>
          </div>
          <div className="mt-8 md:mt-0">
            <h3 className="text-2xl font-semibold mb-4">Điểm Đến</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Hòn Mun
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Hòn Tằm
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Đảo Phú Quốc
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Cù Lao Chàm
                </a>
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

export default Footer;
