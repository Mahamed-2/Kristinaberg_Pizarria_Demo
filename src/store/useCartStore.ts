import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  recipeId: string;
  name: string;
  basePrice: number;
  totalPrice: number;
  selectedIngredients: {
    id: string;
    name: string;
    price: number;
  }[];
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isTrackingOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setCartOpen: (open: boolean) => void;
  setCheckoutOpen: (open: boolean) => void;
  setTrackingOpen: (open: boolean) => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      isCheckoutOpen: false,
      isTrackingOpen: false,
      addItem: (item) => {
        const existingItems = get().items;
        set({ 
          items: [...existingItems, { ...item, quantity: 1, id: `${item.recipeId}-${Date.now()}` }],
          isCartOpen: true // Open cart automatically when adding
        });
      },
      setCartOpen: (open) => set({ isCartOpen: open }),
      setCheckoutOpen: (open) => set({ isCheckoutOpen: open }),
      setTrackingOpen: (open) => set({ isTrackingOpen: open }),
      removeItem: (itemId) => {
        set({ items: get().items.filter((i) => i.id !== itemId) });
      },
      updateQuantity: (itemId, quantity) => {
        set({
          items: get().items.map((i) =>
            i.id === itemId ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0);
      },
    }),
    {
      name: 'kristineberg-pizzeria-cart',
    }
  )
);
