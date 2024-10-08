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
  CreateCategorySchema,
  TCreateCategoryRequest,
} from "@/schema/category.schema";
import { createCategory } from "@/api/category";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statusCategory } from "./config";

interface FormCreateCategoryProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function FormCreateCategory({
  className,
  ...props
}: FormCreateCategoryProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<TCreateCategoryRequest>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      categoryName: "",
      description: "",
      status: "ACTIVE",
    },
  });

  const onSubmit = async (data: TCreateCategoryRequest) => {
    setIsLoading(true);
    try {
      const response = await createCategory(data);
      if (response.status === 200) {
        toast({
          title: "Nguồn hàng đã tạo thành công!",
          description: "Đang chuyển hướng sang danh sách các nguồn hàng...",
        });
        // Redirect hoặc refresh trang nếu cần
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to create category: ${error}`,
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
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên..." {...field} />
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
                    <Input placeholder="Mô tả..." {...field} />
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
                      {statusCategory.map((item, index) => (
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
