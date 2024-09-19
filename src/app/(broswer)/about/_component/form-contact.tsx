"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
const ContactForm = () => {
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Vui lòng nhập email" })
      .email("Email không hợp lệ"),
    name: z.string().min(1, { message: "Vui lòng nhập tên của bạn" }),
    content: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      content: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <div className=" flex flex-col md:flex-row">
        <div className="w-0 md:w-1/2 lg:w-1/2 p-4">
          <Image
            src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg"
            alt="Customer Support"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <form className=" rounded-lg flex flex-col justify-center md:w-1/2 p-2">
          <div className="mb-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className=" w-full py-2 px-3 text-gray-700"
                      id="email"
                      type="email"
                      placeholder="Nhập Email của bạn"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên</FormLabel>
                  <FormControl>
                    <Input
                      className=" w-full py-2 px-3 text-gray-700"
                      id="name"
                      type="text"
                      placeholder="Nhập tên của bạn"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung</FormLabel>
                  <FormControl>
                    <Textarea
                      id="content"
                      placeholder="Nhập nội dung của bạn"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-between ">
            <Button type="submit">
              Gửi ngay <FaArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default ContactForm;
