import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  CreateBaseModelSchema,
  TCreateBaseModelRequest,
} from "@/schema/base-model.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { createBaseModel } from "@/api/base-model";
import { TCategoryResponse } from "@/schema/category.schema";
import { TTableResponse } from "@/types/Table";
import { statusBaseModel } from "./config";
type Props = {
  className?: string;
  categories?: TTableResponse<TCategoryResponse>["listResult"];
};
export function DialogCreateBaseModel({ className, categories }: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<TCreateBaseModelRequest>({
    resolver: zodResolver(CreateBaseModelSchema),
    defaultValues: {
      modelName: "",
      description: "",
      basePrice: 0,
      status: "ACTIVE",
      categoryID: categories?.[0]?.id,
    },
  });

  const onSubmit = async (data: TCreateBaseModelRequest) => {
    setIsLoading(true);
    try {
      const response = await createBaseModel(data);
      if (response.status === 200) {
        toast({
          title: "Tạo mẫu thành công",
        });
        form.reset(); // Reset form sau khi tạo thành công
        return true; // Trả về true để đóng dialog
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
    <Dialog>
      <DialogTrigger asChild className={className}>
        <Button variant="default">Tạo Mẫu</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tạo Mẫu</DialogTitle>
          <DialogDescription>Tạo mẫu mới</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <div className="grid gap-4 py-4">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4 mb-2">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="modelName" className="text-right">
                    Tên Mẫu
                  </Label>
                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="modelName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Tên mẫu..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Mô tả
                  </Label>
                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Mô tả..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="basePrice" className="text-right">
                    Giá Cơ Bản
                  </Label>
                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="basePrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Giá cơ bản..."
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
                              {statusBaseModel.map((item, index) => (
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

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Phân Loại
                  </Label>
                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="categoryID"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn phân loại" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories?.map((item, index) => (
                                <SelectItem key={index} value={item.id}>
                                  {item.categoryName}
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
