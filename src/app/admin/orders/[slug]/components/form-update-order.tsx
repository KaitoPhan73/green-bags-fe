// "use client";

// import * as React from "react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   UpdateBaseModelSchema,
//   TUpdateBaseModelRequest,
//   TBaseModelResponse,
// } from "@/schema/base-model.schema"; // Import schema tương ứng
// import { ReloadIcon } from "@radix-ui/react-icons";
// import { updateBaseModel } from "@/api/base-model";
// import { TTableResponse } from "@/types/Table";
// import { TCategoryResponse } from "@/schema/category.schema";
// import { useRouter } from "next/navigation";
// import { CldUploadWidget } from "next-cloudinary";
// import {
//   TOrderResponse,
//   TUpdateOrderRequest,
//   UpdateOrderSchema,
// } from "@/schema/order.schema";
// import { TAccountResponse } from "@/schema/account.schema";
// import { updateOrder } from "@/api/order";
// import { statusOrder } from "../../components/config";

// interface FormUpdateOrderProps extends React.HTMLAttributes<HTMLDivElement> {
//   initialData: TOrderResponse;
//   categories?: TTableResponse<TAccountResponse>["listResult"];
// }

// export function FormUpdateOrder({
//   className,
//   initialData,
//   categories,
//   ...props
// }: FormUpdateOrderProps) {
//   const [isLoading, setIsLoading] = React.useState<boolean>(false);
//   const { toast } = useToast();

//   const [info, setInfo] = React.useState<any>(null);

//   const form = useForm<TUpdateOrderRequest>({
//     resolver: zodResolver(UpdateOrderSchema),
//     defaultValues: initialData,
//   });
//   React.useEffect(() => {
//     // if (info?.url) {
//     //   form.setValue("image", info.url);
//     // }
//   }, [info, form]);
//   const onSubmit = async (data: TUpdateOrderRequest) => {
//     setIsLoading(true);
//     try {
//       const response = await updateOrder(data); // Gọi hàm API cập nhật
//       if (response.status === "ACTIVE") {
//         toast({
//           title: "Cập nhật mẫu thành công",
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: `Failed to update base model: ${error}`,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   console.log("initialData", initialData);
//   return (
//     <Form {...form}>
//       <div className={cn("grid gap-6", className)} {...props}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-2">
//             {/* Created Date */}
//             <FormField
//               control={form.control}
//               name="createdDate"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Ngày Tạo</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="datetime-local"
//                       {...field}
//                       placeholder="Chọn ngày tạo..."
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Modified Date */}
//             <FormField
//               control={form.control}
//               name="modifiedDate"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Ngày Sửa</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="datetime-local"
//                       {...field}
//                       placeholder="Chọn ngày sửa..."
//                       value={field.value || ""}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Created By */}
//             <FormField
//               control={form.control}
//               name="createdBy"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Tạo Bởi</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Tên người tạo..." {...field} value={field.value || ""} // Provide an empty string if the value is null
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Modified By */}
//             <FormField
//               control={form.control}
//               name="modifiedBy"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Sửa Bởi</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Tên người sửa..." {...field} value={field.value || ""}/>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Status */}
//             <FormField
//               control={form.control}
//               name="status"
//               render={({ field }) => (
//                 <FormItem>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormLabel>Trạng Thái</FormLabel>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Chọn trạng thái" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {statusOrder.map((item, index) => (
//                         <SelectItem key={index} value={item.value}>
//                           {item.label}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* User ID */}
//             <FormField
//               control={form.control}
//               name="userId"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>User ID</FormLabel>
//                   <FormControl>
//                     <Input placeholder="User ID..." {...field} value={field.name || ""}/>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Order Date */}
//             <FormField
//               control={form.control}
//               name="orderDate"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Ngày Đặt Hàng</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="datetime-local"
//                       {...field}
//                       placeholder="Chọn ngày đặt hàng..."
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Total Amount */}
//             <FormField
//               control={form.control}
//               name="totalAmount"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Tổng Tiền</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       placeholder="Nhập tổng tiền..."
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Shipping Address */}
//             <FormField
//               control={form.control}
//               name="shippingAddress"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Địa Chỉ Giao Hàng</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Địa chỉ giao hàng..." {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Order Status */}
//             <FormField
//               control={form.control}
//               name="orderStatus"
//               render={({ field }) => (
//                 <FormItem>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormLabel>Trạng Thái Đơn Hàng</FormLabel>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Chọn trạng thái đơn hàng" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {statusOrder.map((item, index) => (
//                         <SelectItem key={index} value={item.value}>
//                           {item.label}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Order Code */}
//             <FormField
//               control={form.control}
//               name="orderCode"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Mã Đơn Hàng</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Nhập mã đơn hàng..." {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Reason */}
//             <FormField
//               control={form.control}
//               name="reason"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Lý Do</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Nhập lý do..." {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <Button type="submit" disabled={isLoading}>
//             {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
//             Cập Nhật
//           </Button>
//         </form>
//       </div>
//     </Form>
//   );
// }
