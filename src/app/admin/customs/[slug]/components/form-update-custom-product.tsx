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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UpdateCustomProductSchema,
  TUpdateCustomProductRequest,
  TCustomResponse,
  CustomResponseSchema,
} from "@/schema/custom.schema"; // Import corresponding schema
import { ReloadIcon } from "@radix-ui/react-icons";
import { updateCustomProduct } from "@/api/custom";
import { useEffect } from "react";
import { TOptionResponse } from "@/schema/option.schema";
import { TProductResponse } from "@/schema/product.schema";
import { TTableResponse } from "@/types/Table";
import { statusCustomProduct } from "../../components/config";
import { useRouter } from "next/navigation";

interface FormUpdateCustomProductProps
  extends React.HTMLAttributes<HTMLDivElement> {
  initialData: TCustomResponse;
  options?: TTableResponse<TOptionResponse>["listResult"];
  product?: TTableResponse<TProductResponse>["listResult"];
}

export function FormUpdateCustomProduct({
  className,
  initialData,
  options,
  product,
  ...props
}: FormUpdateCustomProductProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const [info, setInfo] = React.useState<any>(null);
  const router = useRouter(); // Initialize the router

  const form = useForm<TUpdateCustomProductRequest>({
    defaultValues: initialData,
  });

  useEffect(() => {
    if (info?.url) {
      console.log("Setting image URL:", info.url); // Log the URL being set
      form.setValue("imageURL", info.url);
    }
  }, [info, form]);

  const onSubmit = async (data: TUpdateCustomProductRequest) => {
    console.log("Form submitted with data:", data); // Log the submitted data
    setIsLoading(true);
    try {
      const response = await updateCustomProduct(data); // Call API update function
      console.log("API response:", response); // Log the API response
      if (response.status === 200) {
        router.push("/admin/customs");
        toast({
          title: "Cập nhật mẫu thành công",
        });
         
      } else {
        toast({
          title: "Cập nhật thất bại",
        });
      }
    } catch (error) {
      console.error("Error occurred during update:", error); // Log the error
      toast({
        title: "Lỗi",
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
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trạng thái</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value} // Use value instead of defaultValue
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusCustomProduct.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
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
              name="totalPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tổng Giá</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Tổng giá..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isLoading}>
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Cập Nhật
          </Button>
        </form>
      </div>
    </Form>
  );
}
