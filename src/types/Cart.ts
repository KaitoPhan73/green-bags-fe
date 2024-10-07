import { TProductResponse } from "@/schema/product.schema";

export interface CartItem extends TProductResponse {
  quantity: number;
  maxStock: number;
}
