import { Star } from "lucide-react";
import Image from "next/image";
import { products } from "@/constants/data";
import AddToCartQuantity from "./_components/add-cart-quantity";
import { getProductById } from "@/api/product";
const ProductDetail = async ({ params }: { params: { id: string } }) => {
  const response = await getProductById(params.id);
  const data = response.payload;
  return (
    <div className="container flex flex-col gap-8 w-[80vw] mt-20 p-8">
      <div className="flex gap-4 bg-slate-100 rounded-md p-8">
        <div className="">
          <Image
            src={data?.img || "/path/to/default/image.jpg"}
            width={600}
            height={600}
            alt="Product"
            layout="intrinsic"
          />
        </div>
        <div className="flex-1 flex flex-col gap-4 justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-2xl font-serif">
              {data?.productName}
            </h1>
            <div className="flex gap-4 items-center">
              <div className="flex gap-2 border-r-2 pr-4">
                <span className="text-3xl font-semibold text-yellow-700">
                  ${data?.finalPrice}
                </span>
                <span className="text-lg line-through text-gray-500">
                  ${data?.finalPrice}
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
              <span>Bag size</span>
            </div>
            <p>{data?.description}</p>
          </div>
          <AddToCartQuantity data={data} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
