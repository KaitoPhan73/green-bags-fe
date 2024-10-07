import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

export function DialogInputReason({
  children,
  className,
  isOpen,
  onClose, // Thêm props onClose
}: {
  children: React.ReactNode; // Thay đổi kiểu dữ liệu thành React.ReactNode
  className?: string;
  isOpen?: boolean;
  onClose: () => void; // Thêm kiểu cho onClose
}) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      onClose(); // Gọi hàm onClose khi nhấn Enter
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button className={className}>Nhập Lý Do</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[800px] max-h-[80vh] overflow-auto"
        onKeyDown={handleKeyDown} // Thêm sự kiện onKeyDown
      >
        <DialogHeader>
          <DialogTitle>Vui lòng nhập lý do hủy</DialogTitle>
        </DialogHeader>

        <p>{children}</p>
      </DialogContent>
    </Dialog>
  );
}
