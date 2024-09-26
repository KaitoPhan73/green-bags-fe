"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
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
import {
  TVoucherGroupRequest,
  VoucherGroupSchema,
} from "@/schema/voucher-group.schema";
import voucherGroupApi from "@/actions/voucher-group";

interface VoucherGroupFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function VoucherGroupForm({
  className,
  ...props
}: VoucherGroupFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<TVoucherGroupRequest>({
    resolver: zodResolver(VoucherGroupSchema),
    defaultValues: {
      networkId: 153475,
      name: "",
      vocherNum: 1,
      deviceNum: 1,
      upRate: 0,
      downRate: 0,
      usageQuota: 0,
      expiration: 1,
      effectDurationMap: { d: "1", h: "1", m: "0" },
      description: "",
      usageLimitType: 0,
      voucherType: 1,
      passwords: ["111111"],
    },
  });

  const onSubmit = async (data: TVoucherGroupRequest) => {
    console.log("data", data);
    setIsLoading(true);
    try {
      const response = await voucherGroupApi.createVoucherGroup(data);
      console.log("response", response);
      if (response.status === 200 && response.payload.retCode === 0) {
        setIsLoading(false);
        toast({
          title: "Voucher Group created successfully",
          description: "You are redirecting!!",
        });
        router.push("/admin/voucher-groups");
        router.refresh();
      } else {
        setIsLoading(false);
        toast({
          title: "Error",
          description: `Failed to create voucher group. ${response.payload.msg}`,
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      console.log("error", error);
      toast({
        title: "Error",
        description: "Failed to create voucher group.",
      });
    }
  };

  return (
    <Form {...form}>
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vocherNum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Voucher Number</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Voucher Number..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deviceNum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Device Number..."
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="upRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Rate</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Upload Rate..."
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="downRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Download Rate</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Download Rate..."
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="usageQuota"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usage Quota</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Usage Quota..."
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiration (Days)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Expiration..."
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="effectDurationMap.d"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Effect Duration (Days)</FormLabel>
                  <FormControl>
                    <Input placeholder="Days..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="effectDurationMap.h"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Effect Duration (Hours)</FormLabel>
                  <FormControl>
                    <Input placeholder="Hours..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="effectDurationMap.m"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Effect Duration (Minutes)</FormLabel>
                  <FormControl>
                    <Input placeholder="Minutes..." {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="usageLimitType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usage Limit Type</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Usage Limit Type..."
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="voucherType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Voucher Type</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Voucher Type..."
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="passwords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Create Voucher
          </Button>
        </form>
      </div>
    </Form>
  );
}
