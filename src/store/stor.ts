import { create } from "zustand";

interface OrderItem {
    id: number;
    name: string;
    price: number;
}

interface OrderState {
    orderItems: OrderItem[];
    selectedTable: number | null;
    addItem: (item: OrderItem) => void;
    removeItem: (id: number) => void;
    setTable: (table: number) => void;
    submitOrder: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
    orderItems: [],
    selectedTable: null,
    addItem: (item) =>
        set((state) => ({
            orderItems: [...state.orderItems, item],
        })),
    removeItem: (id) =>
        set((state) => ({
            orderItems: state.orderItems.filter((item) => item.id !== id),
        })),
    setTable: (table) => set({ selectedTable: table }),
    submitOrder: () => {
        set({ orderItems: [] });
    },
}));
