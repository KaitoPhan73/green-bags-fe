import { MotionDiv } from "@/components/motion-div";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isValidUrl } from "@/lib/utils";
import { TProductResponse } from "@/schema/product.schema";
import { Variants } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

type CardProps = {
  index: number;
  item: TProductResponse;
};

const isLarge = (index: number) => {
  return index % 4 === 1 || index % 4 === 0;
};

const CardProduct = ({ item, index }: CardProps) => {
  const router = useRouter();
  const getCardVariants = (index: number): Variants => {
    return {
      offscreen: {
        x: index % 4 === 1 || index % 4 ? -200 : 200,
        opacity: 0,
      },
      onscreen: {
        x: 0,
        opacity: 1,
        transition: {
          type: "spring",
          bounce: 0.4,
          duration: 2,
        },
      },
    };
  };

  return (
    <MotionDiv
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      variants={getCardVariants(index)}
    >
      <div className="py-2 flex flex-col items-center">
        <div
          className={`relative flex items-center justify-center ${
            isLarge(index + 1) ? "w-full max-w-md h-80" : "w-full max-w-xs h-60"
          }`}
          onClick={() => router.push(`products/${item.id}`)}
          style={{ cursor: "pointer" }}
        >
          <Image
            src={
              item.img && isValidUrl(item.img)
                ? item.img
                : "/images/blue-sky.jpg"
            }
            alt={item.productName ? item.productName : "Product Name"}
            layout="fill"
            className="rounded-lg object-cover"
          />
        </div>

        <div
          className={`flex justify-between items-center mt-2 ${
            isLarge(index + 1) ? "w-full max-w-md" : "w-full max-w-xs"
          }`}
        >
          <div className="p-4 flex-1">
            <h3 className="text-lg sm:text-xl font-semibold">
              {item.productName ? item.productName : "Product Name"}
            </h3>
            <p className="text-gray-700 text-sm sm:text-base">
              {item.finalPrice} VND
            </p>
          </div>
          <div className="ml-4">
            <Button
              className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center"
              onClick={() => router.push(`products/${item.id}`)}
            >
              <FaArrowRight className="h-4 w-4 text-black" />
            </Button>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default CardProduct;
