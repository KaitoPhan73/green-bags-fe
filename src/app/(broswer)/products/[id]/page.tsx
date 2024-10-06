import { Star } from "lucide-react";
import Image from "next/image";
import { products } from "@/constants/data";
import AddToCartQuantity from "./_components/add-cart-quantity";
import { getProductById } from "@/api/product";
import { formatPriceVND } from "@/lib/formatter";
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
                  {formatPriceVND(data?.finalPrice)}
                </span>
              </div>

              <div className="text-gray-500">10 Reviews</div>
            </div>
            <div>
              <span>Mô tả</span>
            </div>
            <p className="text-lg">{data?.description}</p>
          </div>
          <AddToCartQuantity data={data} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
