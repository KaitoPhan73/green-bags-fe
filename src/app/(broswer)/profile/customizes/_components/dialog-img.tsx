import { createPayment } from "@/api/payment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";

export function DialogImg({ imgURL }: { imgURL: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src={imgURL || "/images/not-found.jpg"}
          alt="Product Image"
          width={100}
          height={100}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <Image
          src={imgURL || "/images/not-found.jpg"}
          alt="PayOs"
          width={800}
          height={800}
          className="xl:w-[800px] border-2"
        />
      </DialogContent>
    </Dialog>
  );
}
