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
import authApi from "@/api/authencation";
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
    setIsLoading(true);
    const response = await authApi.checkLogin(data);
    if (response.status === 200) {
      await authApi.auth({
        accessToken: response.payload.accessToken,
        expireTime: response.payload.expireTime,
      });
      toast({
        title: "Sign in successfully",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">You are redirecting!!</code>
          </pre>
        ),
      });
      router.push("/admin/voucher-groups");
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
