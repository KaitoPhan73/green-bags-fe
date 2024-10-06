import { z } from "zod";

export const OptionResponseSchema = z.object({
  id: z.string().uuid(),
  createdDate: z.string(),
  modifiedDate: z.string().nullable(),
  createdBy: z.string().nullable(),
  modifiedBy: z.string().nullable(),
  status: z.string(), 
  optionName: z.string(),
  optionType: z.string(),
  additionalPrice: z.coerce.number().min(0, { message: "Giá không hợp lệ." }), 
});

export type TOptionResponse = z.TypeOf<typeof OptionResponseSchema>;
