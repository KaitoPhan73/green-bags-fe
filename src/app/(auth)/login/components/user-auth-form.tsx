"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
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
import { useRouter } from "next/navigation";
import { LoginSchema, TLoginRequest } from "@/schema/auth.schema";
import { checkLogin } from "@/api/authencation";
import authClient from "@/api/client/auth";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<TLoginRequest>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });

  const onSubmit = async (data: TLoginRequest) => {
    try {
      setIsLoading(true);
      const response = await checkLogin(data);

      if (response.status === 200) {
        await authClient.auth({
          expireTime: 999999999,
          user: response.payload,
        });

        // Check user role and redirect accordingly
        const userRole = response.payload.roleName;

        if (userRole === "admin") {
          toast({
            title: "Chào mừng bạn trở lại",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  Đang chuyển đến trang quản lí
                </code>
              </pre>
            ),
          });
          router.push("/admin/report");
        } else {
          toast({
            title: "Chào mừng bạn trở lại",
          });
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Login error: ", error);
      toast({
        title: "Sign in failed",
        description: "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="emailOrUsername"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tài khoản</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email hoặc tài khoản..."
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mật khẩu..."
                        type="password" // Ensure the password is masked
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Đăng nhập
            </Button>
          </div>
        </form>
        <Separator />
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={() => router.push("/")}
        >
          Về trang chủ
        </Button>
      </div>
    </Form>
  );
}
