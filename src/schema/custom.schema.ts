import z from "zod";

export const CustomResponseSchema = z.object({
  id: z.string().uuid(),
  createdDate: z.string(),
  modifiedDate: z.string(),
  createdBy: z.string(),
  modifiedBy: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  optionName: z.string(),
  optionType: z.string(),
  additionalPrice: z.string(),

});


export const CreateCustomProductSchema = z.object({
  productId: z.string().uuid(),
  optionId: z.string().uuid(),
  imageURL: z.string().uuid(),
  customValue: z.string().uuid(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  userId: z.string().uuid(),

});

export type TCustomResponse = z.TypeOf<typeof CustomResponseSchema>;
export type TCreateCustomProductRequest = z.TypeOf<typeof CreateCustomProductSchema>;
