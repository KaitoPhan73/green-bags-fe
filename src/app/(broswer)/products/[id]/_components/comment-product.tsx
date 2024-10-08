import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TTableResponse } from "@/types/Table";
import { TReviewResponse } from "@/schema/review.schema";

type Props = {
  reviewsResponse: TTableResponse<TReviewResponse>;
};

const CommentProduct = ({ reviewsResponse }: Props) => {
  const hasComments = reviewsResponse.listResult.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold mb-4">Ý kiến </h1>

      {hasComments ? (
        <div className="flex flex-col gap-4">
          {reviewsResponse.listResult.map((item, i) => (
            <div
              className={`flex flex-col gap-2 border p-4 rounded-2xl shadow-lg hover:bg-slate-50`}
              key={i}
            >
              <div className="flex gap-4 justify-between items-center px-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={`https://avatar.iran.liara.run/public`}
                      alt="@shadcn"
                    />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-4">
                      <div className="font-serif text-2xl font-semibold">
                        {item.productID || "Anonymous"}
                      </div>
                      <div className="font-semibold">
                        {new Date(item.createdDate).toUTCString()}
                      </div>
                    </div>
                    <div className="italic">
                      Đánh giá:{" "}
                      {Array.from({ length: item.rating }).map((_, index) => (
                        <span key={index}>⭐️</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">{item.comment}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center italic text-gray-500">
          Hiện chưa có đánh giá nào cho sản phẩm này.
        </p>
      )}
    </div>
  );
};

export default CommentProduct;
