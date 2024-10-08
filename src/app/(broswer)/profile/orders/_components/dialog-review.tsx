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
  FormDescription,
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
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  CreateCategorySchema,
  TCreateCategoryRequest,
} from "@/schema/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { MdOutlineRateReview } from "react-icons/md";
import { createReview } from "@/api/review";
import {
  CreateReviewRequestSchema,
  TCreateReviewRequest,
} from "@/schema/review.schema";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/ui/rating";
import { TProductResponse } from "@/schema/product.schema";
import useUserStore from "@/store/userStore";
export function DialogReview({
  className,
  data,
}: {
  className?: string;
  data: TProductResponse;
}) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { user } = useUserStore();
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
  const form = useForm<TCreateReviewRequest>({
    // resolver: zodResolver(CreateReviewRequestSchema),
    defaultValues: {
      comment: "",
      productID: data.id,
      rating: 5,
      userID: user?.id,
    },
  });

  const onSubmit = async (data: TCreateReviewRequest) => {
    setIsLoading(true);
    try {
      if (!user?.token) {
        throw new Error("User token is missing");
      }
      const response = await createReview(data, user.token);
      if (response.status === 200) {
        toast({
          title: "Đánh giá thành công",
        });
      }
      setOpen(false);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: `Lỗi khi tạo đánh giá: ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className}>
          Ý kiến
          <MdOutlineRateReview className="ml-2 h-full w-full" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl overflow-auto">
        <DialogHeader>
          <DialogTitle>Nhập ý kiến</DialogTitle>
          <DialogDescription>
            Ý kiến của bạn sẽ giúp chúng tôi cải thiện sản phẩm trong tương lai
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <div className="grid gap-4 py-4">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4 mb-2">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="categoryName" className="text-right">
                    Nội dung
                  </Label>
                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="comment"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Vui lòng nội dung..."
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
                  <Label htmlFor="categoryName" className="text-right">
                    Đánh giá
                  </Label>
                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <StarRating
                              rating={field.value}
                              onRatingChange={field.onChange}
                              disabled={false}
                              viewOnly={false}
                            />
                          </FormControl>
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
              </DialogFooter>
            </form>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
