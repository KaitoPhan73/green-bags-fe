"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CldUploadWidget } from "next-cloudinary";
import { Label } from "@/components/ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statusProduct } from "./config";
import {
  CreateProductSchema,
  TCreateProductRequest,
  TProductResponse,
} from "@/schema/product.schema";
import { createProduct, getAllProducts } from "@/api/product";
import { getAllCategories } from "@/api/category";
import { TCategoryResponse } from "@/schema/category.schema";
import { TBaseModelResponse } from "@/schema/base-model.schema";
import { TTableResponse } from "@/types/Table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  className?: string;
  basemodel: TBaseModelResponse[];
};

export function FormCreateProduct({ className, basemodel }: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = React.useState<any>(null);
  const { toast } = useToast();
  const form = useForm<TCreateProductRequest>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      baseModelID: basemodel?.[0]?.id,
      productName: "",
      stock: 0,
      description: "",
      finalPrice: 0,
      img: "",
      status: "ACTIVE",
    },
  });

  useEffect(() => {
    if (info?.url) {
      form.setValue("img", info.url);
    }
  }, [info, form]);
  console.log("form", form.watch());

  const onSubmit = async (data: TCreateProductRequest) => {
    setIsLoading(true);
    try {
      const response = await createProduct(data);
      if (response.status === 200) {
        toast({
          title: "Tạo mẫu thành công",
        });
        setOpen(false);
        form.reset();
        return true;
      }


    } catch (error) {
      toast({
        title: "Lỗi",
        description: `Lỗi khi tạo mẫu: ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild className={className}>
        <Button variant="default" className="mb-4">
          Tạo Sản Phẩm
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Tạo Sản Phẩm</DialogTitle>
          <DialogDescription>
            Điền thông tin sản phẩm vào đây.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <div className="grid gap-4 py-4">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4 mb-2">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="modelName" className="text-right">
                    Chọn
                  </Label>
                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="baseModelID"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="SP gốc" />
                              </SelectTrigger>
                              <SelectContent>
                                {basemodel.map((basemodel) => (
                                  <SelectItem
                                    key={basemodel.id}
                                    value={basemodel.id}
                                  >
                                    {basemodel.modelName}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="productName" className="text-right">
                    Tên SP
                  </Label>
                  <div className="col-span-3">
                    {" "}
                    <FormField
                      control={form.control}
                      name="productName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Tên..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Mô Tả
                  </Label>
                  <div className="col-span-3">
                    {" "}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Mô Tả..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stock" className="text-right">
                    Số Lượng
                  </Label>
                  <div className="col-span-3">
                    {" "}
                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Số Lượng..."
                              min={0}
                              max={100}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="finalPrice" className="text-right">
                    Giá SP
                  </Label>
                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="finalPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Giá Sản Phẩm..."
                              min={0}
                              max={100000000}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Ảnh
                  </Label>
                  <div className="col-span-3">
                    <CldUploadWidget
                      signatureEndpoint="/api/sign-image"
                      onSuccess={(result) => {
                        setInfo(result?.info);
                      }}
                    >
                      {({ open }) => {
                        return (
                          <Button type="button" onClick={() => open()}>
                            Upload an Image
                          </Button>
                        );
                      }}
                    </CldUploadWidget>
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Trạng Thái
                  </Label>
                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn trạng thái" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {statusProduct.map((item, index) => (
                                <SelectItem key={index} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Tạo
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Đóng
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
