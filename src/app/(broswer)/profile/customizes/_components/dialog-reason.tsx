import { createPayment } from "@/api/payment";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogReason({
  reason,
  className,
}: {
  reason: string;
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className}>Bấm Xem Lý Do</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Lý do bị hủy</DialogTitle>
        </DialogHeader>

        <p>{reason ? reason : "Bạn đã hủy thiết kế này"}</p>
      </DialogContent>
    </Dialog>
  );
}
