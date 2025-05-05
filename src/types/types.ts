export type Category = {
    id: number;
    name: string;
};

export type MenuItem = {
    id: number;
    name: string;
    categoryId: number;
    price: number;
};

export type Table = {
    id: number;
    number: number;
};

export type ManagerState = {
    categories: Category[];
    menuItems: MenuItem[];
    tables: Table[];

    addCategory: (category: Category) => void;
    removeCategory: (id: number) => void;

    addMenuItem: (item: MenuItem) => void;
    removeMenuItem: (id: number) => void;

    addTable: (table: Table) => void;
    removeTable: (id: number) => void;
}