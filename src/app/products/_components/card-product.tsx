import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

type CardProps = {
  index: number;
  item: {
    image: string;
    name: string;
    price: number;
    id: number;
  };
};
const isLarge = (index: number) => {
  return index % 4 === 1 || index % 4 === 0;
};
const CardProduct = ({ item, index }: CardProps) => {
  const router = useRouter();

  return (
    <div className="py-2 flex flex-col items-center">
      <div
        className={`${
          isLarge(index + 1) ? "w-96 h-96" : "w-64 h-64"
        } relative flex items-center justify-center`}
      >
        <Image
          src={item.image}
          alt={item.name}
          layout="fill"
          className="rounded-lg"
        />
      </div>

      <div
        className={`flex justify-between items-center mt-2 ${
          isLarge(index + 1) ? "w-96 " : "w-64"
        }`}
      >
        <div className="p-4">
          <h3 className="text-xl font-semibold">{item.name}</h3>
          <p className="text-gray-700 max-w-xl">{item.price} VND</p>
        </div>
        <div>
          <Button
            className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center"
            onClick={() => router.push(`product/${item.id}`)}
          >
            <FaArrowRight className="h-4 w-4 text-black" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CardProduct;
