"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

interface FormCreateProductProps extends React.HTMLAttributes<HTMLDivElement> {
  basemodel: TBaseModelResponse[]; // Add categories prop
}

export function FormCreateProduct({
  className,
  basemodel,
  ...props
}: FormCreateProductProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<TCreateProductRequest>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      baseModelID: "",
      productName: "",
      stock: 0,
      finalPrice: 0,
      status: "ACTIVE",
    },
  });

  const onSubmit = async (data: TCreateProductRequest) => {
    setIsLoading(true);
    try {
      const response = await createProduct(data);
      if (response.status === 200) {
        toast({
          title: "Product created successfully",
          description: "Redirecting to products list...",
        });
        // Redirect hoặc refresh trang nếu cần
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to create product: ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 grid-cols-4 md:grid-cols-2 lg:grid-cols-3 mb-2 items-center">
            <FormField
              control={form.control}
              name="baseModelID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chọn Loại Sản Phẩm:</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại sản phẩm" />
                      </SelectTrigger>
                      <SelectContent>
                        {basemodel.map((basemodel) => (
                          <SelectItem key={basemodel.id} value={basemodel.id}>
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

            <FormField
              control={form.control}
              name="finalPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá Sản Phẩm</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder=">Giá Sản Phẩm..."
                      min={0}
                      max={100000000}
                      {...field}
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
                  <FormLabel>Trạng thái</FormLabel>
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
          <Button type="submit" disabled={isLoading}>
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Tạo
          </Button>
        </form>
      </div>
    </Form>
  );
}
