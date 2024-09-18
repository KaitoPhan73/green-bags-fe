import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import Image from "next/image";
import { products } from "@/constants/data";
const ProductDetail = ({ params }: { params: { id: string } }) => {
  const data = products.find((product) => product.id === Number(params.id));

  return (
    <div className="container flex flex-col gap-8 w-[80vw] mt-20 p-8">
      <div className="flex gap-4 bg-slate-100 rounded-md p-8">
        <div className="">
          <Image
            src={data?.image}
            width={600}
            height={600}
            alt="Product"
            layout="intrinsic"
          />
        </div>
        <div className="flex-1 flex flex-col gap-4 justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-2xl font-serif">{data?.name}</h1>
            <div className="flex gap-4 items-center">
              <div className="flex gap-2 border-r-2 pr-4">
                <span className="text-3xl font-semibold text-yellow-700">
                  ${data?.price}
                </span>
                <span className="text-lg line-through text-gray-500">
                  ${data?.price}
                </span>
              </div>
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 text-yellow-400"
                    fill="currentColor"
                  />
                ))}
              </div>
              <div className="text-gray-500">99 Reviews</div>
            </div>
            <div>
              <span>Bag color</span>
              <div className="flex gap-4 items-center m-4">
                <div className="w-8 h-8 rounded-full bg-red-500"></div>
                <div className="w-8 h-8 rounded-full bg-yellow-500"></div>
                <div className="w-8 h-8 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div>
              <span>Bag size</span>
            </div>
            <p>{data?.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              defaultValue={1}
              className="w-20 h-10"
              min={1}
            />
            <Button className="w-full">Thêm vào giỏ hàng</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
