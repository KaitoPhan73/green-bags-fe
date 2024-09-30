import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
const UploadImage = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Tải Ảnh</Button>
      </DialogTrigger>
      <DialogContent>
        <CldUploadWidget
          uploadPreset="....."
          onClose={(result, { widget }) => {
            widget.close();
            setOpen(false);
          }}
          onSuccess={(result, options) => {
            console.log("Public ID", result);
          }}
        >
          {({ cloudinary, widget, open, results, error }) => {
            widget?.open();
            return <></>;
          }}
        </CldUploadWidget>
      </DialogContent>
    </Dialog>
  );
};

export default UploadImage;
