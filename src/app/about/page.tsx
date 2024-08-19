"use client";
import PageTitle from "@/components/page-tittle";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div>
      <PageTitle title="Về chúng tôi" />
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 dark:text-black pb-4">
              Về Chúng Tôi
            </h1>
            <p className="font-normal text-base leading-6 text-gray-600 dark:text-black">
              Chúng tôi là một công ty chuyên cung cấp các dịch vụ và trải
              nghiệm liên quan đến biển. Với đội ngũ chuyên gia giàu kinh
              nghiệm, chúng tôi cam kết mang đến cho khách hàng những chuyến đi
              và hoạt động lặn biển tuyệt vời nhất. Được thành lập với mục tiêu
              tạo ra những trải nghiệm biển độc đáo, chúng tôi luôn nỗ lực không
              ngừng để cải thiện dịch vụ và đáp ứng nhu cầu của khách hàng.
            </p>
          </div>
          <div className="w-full lg:w-8/12">
            <img
              className="w-full h-auto rounded-lg"
              src="https://cdn.tcdulichtphcm.vn/upload/4-2022/images/2022-10-19/1666139898-636564832830254419_1509003319058-2.jpg"
              alt="Nhóm người trên biển"
            />
          </div>
        </div>

        <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 dark:text-black pb-4">
              Câu Chuyện Của Chúng Tôi
            </h1>
            <p className="font-normal text-base leading-6 text-gray-600 dark:text-black">
              Chúng tôi bắt đầu hành trình của mình với niềm đam mê mạnh mẽ đối
              với đại dương và các hoạt động biển. Từ những ngày đầu, chúng tôi
              đã tập trung vào việc cung cấp những dịch vụ tốt nhất cho khách
              hàng. Chúng tôi tin rằng mỗi chuyến đi biển là một trải nghiệm quý
              giá, và chúng tôi luôn cố gắng làm cho từng khoảnh khắc trở nên
              đáng nhớ.
            </p>
          </div>
          <div className="w-full lg:w-8/12 lg:pt-8">
            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
              <div className="p-4 flex justify-center items-center">
                <Image
                  width={500}
                  height={500}
                  className="w-full h-auto rounded-lg"
                  src="https://lh6.googleusercontent.com/proxy/zFqCb4q6DCNyewGvbm8hAAuxXva-qr0FHAUaP46k0NUMI5A0lfljKMBMpHsuSTBMTGJZKog74cV95IxXeKAzw7L8J6OyhQwvCH2h7zkepY8YrR3PovECoi8nouwSyMgepN-qgKKnMCuRVg"
                  alt="Nhân viên 1"
                />
              </div>
              <div className="p-4 flex justify-center items-center">
                <Image
                  width={500}
                  height={500}
                  className="w-full h-auto rounded-lg"
                  src="https://lh6.googleusercontent.com/proxy/zFqCb4q6DCNyewGvbm8hAAuxXva-qr0FHAUaP46k0NUMI5A0lfljKMBMpHsuSTBMTGJZKog74cV95IxXeKAzw7L8J6OyhQwvCH2h7zkepY8YrR3PovECoi8nouwSyMgepN-qgKKnMCuRVg"
                  alt="Nhân viên 2"
                />
              </div>
              <div className="p-4 flex justify-center items-center">
                <Image
                  width={500}
                  height={500}
                  className="w-full h-auto rounded-lg"
                  src="https://lh6.googleusercontent.com/proxy/zFqCb4q6DCNyewGvbm8hAAuxXva-qr0FHAUaP46k0NUMI5A0lfljKMBMpHsuSTBMTGJZKog74cV95IxXeKAzw7L8J6OyhQwvCH2h7zkepY8YrR3PovECoi8nouwSyMgepN-qgKKnMCuRVg"
                  alt="Nhân viên 3"
                />
              </div>
              <div className="p-4 flex justify-center items-center">
                <Image
                  width={500}
                  height={500}
                  className="w-full h-auto rounded-lg"
                  src="https://lh6.googleusercontent.com/proxy/zFqCb4q6DCNyewGvbm8hAAuxXva-qr0FHAUaP46k0NUMI5A0lfljKMBMpHsuSTBMTGJZKog74cV95IxXeKAzw7L8J6OyhQwvCH2h7zkepY8YrR3PovECoi8nouwSyMgepN-qgKKnMCuRVg"
                  alt="Nhân viên 4"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12">
          <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 dark:text-black pb-4">
            Đội Ngũ Của Chúng Tôi
          </h1>
          <p className="font-normal text-base leading-6 text-gray-600 dark:text-black">
            Chúng tôi tự hào về đội ngũ của mình - những người đầy nhiệt huyết
            và tài năng trong lĩnh vực lặn biển. Mỗi thành viên đều có kinh
            nghiệm phong phú và đam mê sâu sắc với đại dương, sẵn sàng cung cấp
            cho khách hàng những trải nghiệm tốt nhất. Đội ngũ của chúng tôi là
            nền tảng của sự thành công và sự hài lòng của khách hàng.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
