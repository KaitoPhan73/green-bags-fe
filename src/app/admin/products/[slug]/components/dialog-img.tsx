import { createPayment } from "@/api/payment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CldImage } from "next-cloudinary";

import Image from "next/image";

export function DialogImg({
  imgURL,
  className,
}: {
  imgURL: string;
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div style={{ cursor: "pointer" }}>
          <CldImage
            width={100}
            height={100}
            src={imgURL}
            alt="Uploaded image"
          />
          <p>Nhấn vào để xem</p>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-auto">
        <CldImage width={800} height={800} src={imgURL} alt="Uploaded image" />
      </DialogContent>
    </Dialog>
  );
}
