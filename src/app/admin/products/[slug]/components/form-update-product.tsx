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

interface FormUpdateProductProps extends React.HTMLAttributes<HTMLDivElement> {
  initialData: TUpdateProductRequest;
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
  const onSubmit = async (data: TUpdateProductRequest) => {
    // console.log(data);
    setIsLoading(true);
    try {
      const response = await updateProduct(data);
      if (response.status === 200) {
        toast({
          title: "Product updated successfully",
          description: "Redirecting to Product list...",
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
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trạng Thái</FormLabel>
                  <FormControl>
                    <Input placeholder="Status..." {...field} />
                  </FormControl>
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
