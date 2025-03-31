/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductResponse } from '@/api/actions/product/product.types';
import { BigCategory } from '@/utils/constants/bigCategory';
import { MmoResourceResponse } from '@/api/actions/mmoResource/mmo-resource.types';
import { DurationEnum } from '@/utils/constants/duration';

export interface CartItem {
  category: BigCategory;
  product?: ProductResponse;
  mmoResource?: MmoResourceResponse;
  quantity: number;
  duration: DurationEnum;
  price: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (newItem) => {
        set((state) => {
          // Check if product already exists in cart
          const existingItemIndex = state.items.findIndex(
            (item) => item.product?.id === newItem.product?.id && item.duration === newItem.duration,
          );

          if (existingItemIndex >= 0) {
            // Update quantity if product already in cart
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += newItem.quantity;
            return { items: updatedItems };
          } else {
            // Add new item to cart
            return { items: [...state.items, newItem] };
          }
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product?.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) => (item.product?.id === productId ? { ...item, quantity } : item)),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage', // unique name for localStorage
    },
  ),
);
