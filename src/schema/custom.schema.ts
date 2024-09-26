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

export type TCustomResponse = z.TypeOf<typeof CustomResponseSchema>;
