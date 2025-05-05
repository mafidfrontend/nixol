import { create } from "zustand";
import { ManagerState } from "@/types/types";

export const useManagerStore = create<ManagerState>((set) => ({
    categories: [],
    menuItems: [],
    tables: [],

    addCategory: (category) =>
        set((state) => ({
            categories: [...state.categories, category],
        })),
    removeCategory: (id) =>
        set((state) => ({
            categories: state.categories.filter((cat) => cat.id !== id),
        })),

    addMenuItem: (item) =>
        set((state) => ({
            menuItems: [...state.menuItems, item],
        })),
    removeMenuItem: (id) =>
        set((state) => ({
            menuItems: state.menuItems.filter((item) => item.id !== id),
        })),

    addTable: (table) =>
        set((state) => ({
            tables: [...state.tables, table],
        })),
    removeTable: (id) =>
        set((state) => ({
            tables: state.tables.filter((table) => table.id !== id),
        })),
}));