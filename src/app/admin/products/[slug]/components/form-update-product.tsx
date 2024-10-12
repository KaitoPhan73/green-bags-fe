"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { ReloadIcon } from "@radix-ui/react-icons";
import {
  TProductResponse,
  TUpdateProductRequest,
  UpdateProductSchema,
} from "@/schema/product.schema";
import { updateProduct } from "@/api/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statusProduct } from "../../_components/config";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { DialogImg } from "./dialog-img";

interface FormUpdateProductProps extends React.HTMLAttributes<HTMLDivElement> {
  initialData: TProductResponse;
}

export function FormUpdateProduct({
  className,
  initialData,
  ...props
}: FormUpdateProductProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<TUpdateProductRequest>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: initialData,
  });
  // console.log("noooo", initialData),
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (data: TUpdateProductRequest) => {
    // console.log(data);
    setIsLoading(true);
    try {
      const response = await updateProduct(data);
      if (response.status === 200) {
        toast({
          title: "Cập nhật sản phẩm thành công!",
          // description: "Đang chuyển hướng sang danh sách sản phẩm...",
        });
        // Redirect hoặc refresh trang nếu cần
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update product: ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-2">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên Sản Phẩm</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số Lượng</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Số Lượng..."
                      {...field}
                      min={0}
                      max={100}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="finalPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá Cả</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Giá..."
                      {...field}
                      min={0}
                      max={100000000}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mô tả..."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="img"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Ảnh</FormLabel>
                  <FormControl>
                    <div>
                      <CldUploadWidget
                        signatureEndpoint="/api/sign-image"
                        onSuccess={(result: any) => {
                          field.onChange(result?.info.url);
                        }}
                      >
                        {({ open }) => (
                          <Button
                            type="button"
                            className="w-full"
                            onClick={() => open()}
                          >
                            Chọn ảnh
                          </Button>
                        )}
                      </CldUploadWidget>
                      {field.value && (
                        <div className="relative mt-4">
                          <DialogImg imgURL={field.value} />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormLabel>Trạng thái</FormLabel>

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
          <Button type="submit" disabled={isLoading}>
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Câp Nhật
          </Button>
        </form>
      </div>
    </Form>
  );
}
