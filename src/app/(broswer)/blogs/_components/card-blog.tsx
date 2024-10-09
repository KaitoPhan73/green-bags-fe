"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { FaArrowRight } from "react-icons/fa";
type CardProps = {
  image: string;
  link: string;
  name: string;
  description: string;
  createdDate: string;
};

const CardBlog = ({
  image,
  link,
  name,
  description,
  createdDate,
}: CardProps) => {
  const router = useRouter();
  const handleNavigate = (link: string) => {
    router.push(link);
  };

  return (
    <div className="p-1">
      <Card onClick={() => handleNavigate(link)} className="cursor-pointer rounded-lg relative overflow-hidden transform transition-transform duration-300 hover:scale-105 ">
        <CardContent className="relative h-96 w-full dark:bg-gray-800">
          <Badge className="absolute top-6 left-6 z-10 ">Mới</Badge>
          <Image
            src={image}
            alt={name}
            layout="fill"
            style={{ objectFit: "cover" }}
            className="w-full h-full p-4 rounded-lg"
          />
        </CardContent>
        <CardFooter className="p-4 shadow-lg dark:bg-gray-800">
          <div className="flex flex-col">
            <h3 className="text-lg sm:text-xl font-semibold">{name}</h3>
            <p className="text-gray-700 dark:text-white text-sm sm:text-base mt-1 line-clamp-3">
              {description}
            </p>
            <div className="flex justify-between items-center mt-2">
              <div className="flex-1">
                <p className="text-gray-500 dark:text-white text-xs sm:text-sm">
                  {createdDate}
                </p>
              </div>
              <div className="ml-4">
                <Button
                  className="h-12 w-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
                >
                  <FaArrowRight className="h-4 w-4 text-black" />
                </Button>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardBlog;
