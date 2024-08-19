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
          src="/images/blue-sky.jpg"
          alt="Background"
          layout="fill"
          objectFit="fill"
          className="z-0"
        />
        <div className="absolute inset-0 bg-black opacity-20 z-10" />
      </div>
      <div className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 p-8 rounded-t-lg max-w-xl opacity-80 w-full text-center absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-black to-blue-800 inline-block text-transparent bg-clip-text mb-4">
          {title}
        </h1>
      </div>
    </Card>
  );
};

export default PageTitle;
