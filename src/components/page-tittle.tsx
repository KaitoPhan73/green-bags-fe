import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";

type Props = {
  title: string;
};

const PageTitle = ({ title }: Props) => {
  return (
    <Card className="relative flex items-center justify-center min-h-80 rounded-none overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/background-page-title.jpg"
          alt="Background"
          layout="fill"
          objectFit="fill"
          className="z-0"
        />
        <div className="absolute inset-0 bg-black opacity-20 z-2" />
      </div>
      <div className="bg-gradient-to-r from-indigo-200  to-pink-200 p-8 rounded-t-lg max-w-xl  w-full text-center absolute bottom-0 left-1/2 transform -translate-x-1/2 z-3">
        <h1 className="text-4xl font-bold bg-black inline-block text-transparent bg-clip-text">
          {title}
        </h1>
      </div>
    </Card>
  );
};

export default PageTitle;
