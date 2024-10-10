import { Star } from "lucide-react";
import Image from "next/image";
import { products } from "@/constants/data";
import AddToCartQuantity from "./_components/add-cart-quantity";
import { getProductById } from "@/api/product";
import { formatPriceVND } from "@/lib/formatter";
import CommentProduct from "./_components/comment-product";
import { getAllReviewByProductId } from "@/api/review";
import { isValidUrl } from "@/lib/utils";
const ProductDetail = async ({ params }: { params: { id: string } }) => {
  const product = getProductById(params.id);
  const review = getAllReviewByProductId(params.id);
  const [productResponse, reviewsResponse] = await Promise.all([
    product,
    review,
  ]);
  const data = productResponse.payload;
  return (
    <div className="container flex flex-col gap-6 w-[80vw] mt-20 p-8">
      <div className="bg-slate-100 dark:bg-slate-900 rounded-md p-8">
        <div className="flex gap-4">
          <div className="">
            <Image
              src={
                data.img && isValidUrl(data.img)
                  ? data.img
                  : "/images/blue-sky.jpg"
              }
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

                {/* <div className="text-gray-500">10 Reviews</div> */}
              </div>
              <div className="flex gap-4 items-center">
                <span>Kho: </span>

                <div className="text-gray-900 dark:text-white">
                  {data.stock} cái
                </div>
              </div>
              <div className="gap-2">
                <span className="text-xl font-semibold">Mô tả: </span>
                <p className="italic ">{data?.description}</p>
              </div>
            </div>
            <AddToCartQuantity data={data} />
          </div>
        </div>
      </div>

      <CommentProduct reviewsResponse={reviewsResponse.payload} />
    </div>
  );
};

export default ProductDetail;
