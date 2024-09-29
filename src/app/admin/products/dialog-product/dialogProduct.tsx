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
import { FormCreateProduct } from "../components/form-create-product";
import { TCategoryResponse } from "@/schema/category.schema";

interface DialogProductProps {
  basemodel: any;
}

export function DialogProduct({ basemodel }: DialogProductProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="mb-4">
          Tạo Sản Phẩm
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tạo Sản Phẩm</DialogTitle>
          <DialogDescription>
            Điền thông tin sản phẩm vào đây.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <FormCreateProduct basemodel={basemodel}/>
        </div>
        <DialogFooter>
          <Button type="submit">Lưu thay đổi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

