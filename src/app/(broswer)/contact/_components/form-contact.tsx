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
        <form className="bg-gray-50 rounded-lg flex flex-col justify-center md:w-1/2 p-6 lg:p-12">
          <div className="mb-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                      className="resize-none shadow"
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
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-6"
              type="submit"
            >
              Gửi
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default ContactForm;
