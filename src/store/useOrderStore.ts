import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MenuItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface Order {
    id: number;
    table: number;
    items: MenuItem[];
    createdAt: string;
    status: "pending" | "progress" | "done";
}

interface OrderState {
    selectedTable: number | null;
    orderItems: Record<number, MenuItem[]>;
    orders: Order[];
    setTable: (table: number) => void;
    addItem: (item: Omit<MenuItem, "quantity">) => void;
    removeItem: (id: number) => void;
    submitOrder: () => void;
    updateOrderStatus: (
        orderId: number,
        newStatus: "pending" | "progress" | "done"
    ) => void;
}
export const useOrderStore = create<OrderState>()(
    persist(
      (set, get) => ({
        selectedTable: null,
        orderItems: {},
        orders: [],
  
        setTable: (table) => set({ selectedTable: table }),
  
        addItem: (item) => {
          const { selectedTable, orderItems } = get();
          if (selectedTable === null) return;
  
          const currentItems = orderItems[selectedTable] || [];
          const existing = currentItems.find((i) => i.id === item.id);
  
          const updatedItems = existing
            ? currentItems.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              )
            : [...currentItems, { ...item, quantity: 1 }];
  
          set({
            orderItems: {
              ...orderItems,
              [selectedTable]: updatedItems,
            },
          });
        },
  
        removeItem: (id) => {
          const { selectedTable, orderItems } = get();
          if (selectedTable === null) return;
  
          const updatedItems = (orderItems[selectedTable] || []).filter(
            (item) => item.id !== id
          );
  
          set({
            orderItems: {
              ...orderItems,
              [selectedTable]: updatedItems,
            },
          });
        },
  
        submitOrder: () => {
          const { selectedTable, orderItems, orders } = get();
  
          if (selectedTable === null) return;
          const items = orderItems[selectedTable] || [];
  
          if (items.length === 0) return;
  
          const newOrder: Order = {
            id: Date.now(),
            table: selectedTable,
            items,
            createdAt: new Date().toISOString(),
            status: "pending",
          };
  
          set({
            orders: [newOrder, ...orders],
            orderItems: {
              ...orderItems,
              [selectedTable]: [],
            },
          });
  
          toast.success(
            `Buyurtma #${newOrder.id} yuborildi. Stol #${selectedTable}. Holati: tayyorlanmoqda.`
          );
        },
  
        updateOrderStatus: (orderId, newStatus) => {
          set((state) => {
            const updatedOrders = state.orders.map((order) =>
              order.id === orderId ? { ...order, status: newStatus } : order
            );
  
            switch (newStatus) {
              case "progress":
                toast.info("Buyurtma tayyorlanmoqda...");
                break;
              case "done":
                toast.success("Buyurtma tayyor bo‘ldi!");
                break;
              case "pending":
                toast("Buyurtma kutish holatida.");
                break;
            }
  
            return { orders: updatedOrders };
          });
        },
      }),
      {
        name: "order-storage",
      }
    )
  );