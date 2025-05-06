import { create } from "zustand";

interface MenuItem {
    id: number;
    name: string;
    price: number;
}

interface OrderItem extends MenuItem {
    quantity: number;
}

interface Order {
    table: number;
    items: OrderItem[];
    createdAt: string;
}

interface OrderState {
    selectedTable: number | null;
    orderItems: Record<number, OrderItem[]>; // table -> items
    orders: Order[];
    setTable: (table: number) => void;
    addItem: (item: MenuItem) => void;
    removeItem: (id: number) => void;
    submitOrder: () => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
    selectedTable: null,
    orderItems: {},
    orders: [],
    setTable: (table) => set({ selectedTable: table }),
    addItem: (item) => {
        const { selectedTable, orderItems } = get();
        if (!selectedTable) return;

        const tableOrders = orderItems[selectedTable] || [];
        const existingItem = tableOrders.find((i) => i.id === item.id);

        let updatedTableOrders;
        if (existingItem) {
            updatedTableOrders = tableOrders.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            );
        } else {
            updatedTableOrders = [...tableOrders, { ...item, quantity: 1 }];
        }

        set({
            orderItems: {
                ...orderItems,
                [selectedTable]: updatedTableOrders,
            },
        });
    },
    removeItem: (id) => {
        const { selectedTable, orderItems } = get();
        if (!selectedTable) return;

        const tableOrders = orderItems[selectedTable] || [];
        const updatedTableOrders = tableOrders
            .map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter((item) => item.id !== id || item.quantity > 0);

        set({
            orderItems: {
                ...orderItems,
                [selectedTable]: updatedTableOrders,
            },
        });
    },
    submitOrder: () => {
        const { selectedTable, orderItems, orders } = get();
        if (!selectedTable) return;

        const items = orderItems[selectedTable];
        if (!items || items.length === 0) return;

        const newOrder: Order = {
            table: selectedTable,
            items,
            createdAt: new Date().toISOString(),
        };

        const newOrderItems = { ...orderItems };
        delete newOrderItems[selectedTable];

        set({
            orders: [newOrder, ...orders],
            orderItems: newOrderItems,
        });
    },
}));