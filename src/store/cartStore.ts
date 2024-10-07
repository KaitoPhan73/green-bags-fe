import { TProductResponse } from "@/schema/product.schema";
import { CartItem } from "@/types/Cart";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartStore {
  items: CartItem[];
  addItem: (item: TProductResponse, quantity: number) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item: TProductResponse, quantity: number) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          const maxStock = item.stock; // Lấy stock từ sản phẩm để làm maxStock

          if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            if (newQuantity > maxStock) {
              toast.error(
                `Số lượng sản phẩm "${item.productName}" không thể vượt quá ${maxStock}.`
              );
              return state;
            }
            toast.success(
              `Đã thêm ${quantity} sản phẩm "${item.productName}" vào giỏ hàng.`
            );
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: newQuantity } : i
              ),
            };
          } else {
            if (quantity > maxStock) {
              toast.error(
                `Số lượng sản phẩm "${item.productName}" không thể vượt quá ${maxStock}.`
              );
              return state;
            }
            toast.success(
              `Đã thêm ${quantity} sản phẩm "${item.productName}" vào giỏ hàng.`
            );
            return { items: [...state.items, { ...item, quantity, maxStock }] };
          }
        });
      },
      removeItem: (itemId: string) => {
        set((state) => {
          const itemToRemove = state.items.find((item) => item.id === itemId);
          if (itemToRemove) {
            toast.success(
              `Sản phẩm "${itemToRemove.productName}" đã được xóa khỏi giỏ hàng.`
            );
          }
          return {
            items: state.items.filter((item) => item.id !== itemId),
          };
        });
      },
      updateItemQuantity: (itemId: string, quantity: number) =>
        set((state) => {
          const itemToUpdate = state.items.find((item) => item.id === itemId);
          if (itemToUpdate && quantity > itemToUpdate.maxStock) {
            toast.error(
              `Số lượng sản phẩm "${itemToUpdate.productName}" không thể vượt quá ${itemToUpdate.maxStock}.`
            );
            return state;
          }
          return {
            items: state.items.map((item) =>
              item.id === itemId ? { ...item, quantity } : item
            ),
          };
        }),
      clearCart: () => {
        set({ items: [] });
        toast.success("Giỏ hàng đã được dọn sạch.");
      },
      getTotal: () => {
        const items = get().items;
        return items.reduce(
          (total, item) => total + item.finalPrice * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
