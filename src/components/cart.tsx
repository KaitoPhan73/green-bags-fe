"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useCartStore from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import Empty from "@/components/empty";
function Cart() {
  const { items, clearCart, getTotal } = useCartStore();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="/cart">
            <Button variant="outline" size="icon" className="relative ">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute inset-0 object-right-top mt-0 -mr-6">
                <div className="inline-flex items-center px-1 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                  {items.length}
                </div>
              </span>
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <div className="w-[250px]">
            <h2 className="mt-2 text-primary/60 text-xs">Giỏ hàng của bạn</h2>
            <Separator className="my-2" />
            {items.length === 0 ? (
              <Empty height={70} width={70}>
                <h1 className="font-titleFont text-sm font-bold uppercase">
                  Giỏ hàng của bạn trống
                </h1>
              </Empty>
            ) : (
              <div>
                {items.map((item, index) => (
                  <div className="flex justify-between w-full py-2" key={index}>
                    <div className="flex items-start gap-2">
                      <Image
                        src={item.img}
                        alt="product"
                        width={48}
                        height={48}
                        className="rounded-lg"
                      />
                      <div>
                        <p className="text-sm font-normal">
                          {item.productName}
                        </p>
                        <p className="text-xs text-gray-500">{item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-normal">{item.finalPrice}</p>
                  </div>
                ))}
                <Separator className="mb-2" />
                <Button variant="default" className="w-full mb-1" asChild>
                  <Link href="/cart">Xem giỏ hàng</Link>
                </Button>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default Cart;
