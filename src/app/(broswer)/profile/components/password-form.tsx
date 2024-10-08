"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { updateAccount } from "@/api/account";
import useUserStore from "@/store/userStore";
import { useToast } from "@/hooks/use-toast";

type PasswordFormBodyType = {
  password: string;
  confirmedPassword: string;
};

const PasswordFormBody = z
  .object({
    password: z.string().min(8, "Mật khẩu mới phải chứa ít nhất 8 ký tự"),
    confirmedPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmedPassword"], // This indicates where the error message should appear
  });

export function PasswordForm() {
  const router = useRouter();
  const { user } = useUserStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const form = useForm<PasswordFormBodyType>({
    resolver: zodResolver(PasswordFormBody),
    defaultValues: {
      confirmedPassword: "",
      password: "",
    },
  });

  async function onSubmit(value: PasswordFormBodyType) {
    try {
      if (!user?.id) {
        throw new Error("User ID is required");
      }
      setIsLoading(true); // Start loading
      const response = await updateAccount(user.id, value);
      if (response.status === 200) {
        toast({
          title: "Cập nhật mật khẩu thành công. vui lòng đăng nhập lại",
        });
        setTimeout(() => {
          router.push("/logout"); // Điều hướng đến trang đăng xuất sau 2 giây
        }, 2000);
      }
      form.reset();
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Cập nhật mật khẩu thất bại",
      });
      console.error(error);
    } finally {
      setIsLoading(false); // End loading
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu mới</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập mật khẩu mới..."
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmedPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Xác nhận mật khẩu</FormLabel>
              <FormControl>
                <Input
                  placeholder="Xác nhận mật khẩu..."
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormDescription>Xác nhận lại mật khẩu của bạn</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="!mt-8" disabled={isLoading}>
          {isLoading ? "Đang cập nhật..." : "Cập nhật"}
        </Button>
      </form>
    </Form>
  );
}
