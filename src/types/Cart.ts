export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  color: string;
  size: string;
  image: string;
};

export interface CartItem extends Product {
  quantity: number;
}
