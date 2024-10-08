import z from "zod";

// Schema cho Review Response
export const ReviewResponseSchema = z.object({
  id: z.string().uuid(),
  createdDate: z.string(),
  modifiedDate: z.string(),
  createdBy: z.string(),
  modifiedBy: z.string(),
  status: z.string(),
  productID: z.string().uuid(),
  userID: z.string().uuid(),
  rating: z.number().min(0).max(5), // Giả định rating từ 0 đến 5
  comment: z.string(),
});

// Schema cho Review Request
export const CreateReviewRequestSchema = z.object({
  productID: z.string().uuid(),
  userID: z.string().uuid(),
  rating: z.number().min(0).max(5),
  comment: z.string().min(1, { message: "Bình luận không được để trống." }),
});

// Các type
export type TReviewResponse = z.TypeOf<typeof ReviewResponseSchema>;
export type TCreateReviewRequest = z.TypeOf<typeof CreateReviewRequestSchema>;
