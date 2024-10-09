"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { updateAccount } from "@/api/account"; // Giả sử updateAccount là hàm API cập nhật thông tin tài khoản
import useUserStore from "@/store/userStore";
import { useToast } from "@/hooks/use-toast";

// Schema validation
const ProfileFormBody = z.object({
  fullName: z.string().min(1, "Tên đầy đủ là bắt buộc"),
  email: z.string().optional(),
  username: z.string().optional(),
});

type ProfileFormBodyType = z.infer<typeof ProfileFormBody>;

export function ProfileForm() {
  const { user, setUser } = useUserStore();
  const { toast } = useToast();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormBodyType>({
    resolver: zodResolver(ProfileFormBody),
    defaultValues: {
      fullName: user?.fullName || "",
    },
  });

  const onSubmit = async (values: ProfileFormBodyType) => {
    try {
      setIsLoading(true);
      if (!user?.id) {
        throw new Error("Cần có ID người dùng");
      }

      // Giả sử updateAccount là hàm gửi yêu cầu cập nhật
      const response = await updateAccount(user.id, {
        fullName: values.fullName,
      });

      if (response.status === 200) {
        toast({
          title: "Cập nhật thông tin thành công. Vui lòng đăng nhập lại",
        });
        setTimeout(() => {
          router.push("/logout"); // Điều hướng đến trang đăng xuất sau 2 giây
        }, 1000);
      }
    } catch (error: any) {
      toast({
        title: "Cập nhật thông tin thất bại",
      });
      console.error("Không thể cập nhật thông tin:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Trường Username bị vô hiệu hóa */}
        <FormField
          control={form.control}
          name="username"
          render={() => (
            <FormItem>
              <FormLabel>Tên người dùng</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tên người dùng"
                  value={user?.username || ""}
                  disabled // Vô hiệu hóa trường này
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Trường Email bị vô hiệu hóa */}
        <FormField
          control={form.control}
          name="email"
          render={() => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
                  value={user?.email || ""}
                  disabled // Vô hiệu hóa trường này
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Trường Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên đầy đủ</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên đầy đủ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="!mt-8" disabled={isLoading}>
          {isLoading ? "Đang cập nhật..." : "Cập nhật thông tin"}
        </Button>
      </form>
    </Form>
  );
}
