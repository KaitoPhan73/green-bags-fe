import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

function Cart() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="/cart">
            <Button variant="outline" size="icon" className="relative ">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute inset-0 object-right-top mt-0 -mr-6">
                <div className="inline-flex items-center px-1 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                  2
                </div>
              </span>
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <div className="w-[250px]">
            <h2 className="mt-2 text-primary/60 text-xs">
              Newly Added Products
            </h2>
            <Separator className="my-2" />
            <div>
              <div className="flex justify-between w-full py-2">
                <div className="flex items-start gap-2">
                  <Image
                    src="https://i.pinimg.com/736x/12/48/b3/1248b306c4af4ac31e851fc1c213fda3.jpg"
                    alt="product"
                    width={48}
                    height={48}
                    className="rounded-lg"
                  />
                  <div>
                    <p className="text-sm font-normal">Product Name</p>
                    <p className="text-xs text-gray-500">Quantity: 1</p>
                  </div>
                </div>
                <p className="text-sm font-normal">$100</p>
              </div>
              <div className="flex justify-between w-full py-2">
                <div className="flex items-start gap-2">
                  <Image
                    src="https://i.pinimg.com/736x/12/48/b3/1248b306c4af4ac31e851fc1c213fda3.jpg"
                    alt="product"
                    width={48}
                    height={48}
                    className="rounded-lg"
                  />
                  <div>
                    <p className="text-sm font-normal">Product Name</p>
                    <p className="text-xs text-gray-500">Quantity: 1</p>
                  </div>
                </div>
                {/* <p className="text-sm font-normal">$100</p> */}
                <Button
                  variant="outline"
                  onClick={() =>
                    toast("Event has been created", {
                      description: "Sunday, December 03, 2023 at 9:00 AM",
                      action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                      },
                    })
                  }
                >
                  Show Toast
                </Button>
              </div>
            </div>
            <Separator className="mb-2" />
            <Button variant="default" className="w-full mb-1" asChild>
              <Link href="/cart">Xem giỏ hàng</Link>
            </Button>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default Cart;
