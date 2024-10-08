"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { TAccountResponse } from "@/schema/account.schema";
import useUserStore from "@/store/userStore";

export function ProfileForm() {
  const { user } = useUserStore();
  const router = useRouter();
  const form = useForm<TAccountResponse>({
    // resolver: zodResolver(AccountFormBody),
    defaultValues: {
      username: user?.username,
      email: user?.email,
      // yob: data.yob,
    },
  });

  const onSubmit = async (values: TAccountResponse) => {
    try {
      router.refresh();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên </FormLabel>
              <FormControl>
                <Input placeholder="Tên" {...field} />
              </FormControl>
              <FormDescription>Đây là tên của người dùng</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Email..." {...field} />
              </FormControl>
              <FormDescription>
                Email sẽ được sử dụng để đăng nhập
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Button className="!mt-8">Update profile</Button> */}
      </form>
    </Form>
  );
}
