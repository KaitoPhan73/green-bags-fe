import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CheckoutCustomForm from "./checkout";
import { TCustomResponse } from "@/schema/custom.schema";

export function DialogCheckoutCustom({ data }: { data: TCustomResponse }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Thanh toán</Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <CheckoutCustomForm data={data} />
      </DialogContent>
    </Dialog>
  );
}
