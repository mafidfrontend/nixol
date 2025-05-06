"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../_components/Button";
import { Input } from "../../_components/Input";
import { ListItem } from "../../_components/ListItem";
import { Select } from "../../_components/Select";
import { useManagerStore } from "@/store/useManagerStore";
import Head from "next/head";

export default function MenejerPage() {
    const {
        categories,
        menuItems,
        tables,
        addCategory,
        removeCategory,
        addMenuItem,
        removeMenuItem,
        addTable,
        removeTable,
    } = useManagerStore();

    const [pageTitle] = useState("Manager Dashboard");
    const [newCategory, setNewCategory] = useState("");
    const [newTable, setNewTable] = useState(0);
    const [newMenuItem, setNewMenuItem] = useState({
        name: "",
        categoryId: 0,
        price: 0,
    });

    const handleAddCategory = () => {
        const trimmed = newCategory.trim();
        if (!trimmed) return toast.error("Kategoriya nomini kiriting");
        const exists = categories.find(
            (c) => c.name.toLowerCase() === trimmed.toLowerCase()
        );
        if (exists) return toast.error(`"${trimmed}" allaqachon mavjud`);
        addCategory({ id: Date.now(), name: trimmed });
        toast.success(`"${trimmed}" kategoriyasi qo‘shildi`);
        setNewCategory("");
    };

    const handleAddMenuItem = () => {
        const { name, categoryId, price } = newMenuItem;
        if (!name.trim() || categoryId <= 0 || price <= 0) {
            return toast.error("Barcha maydonlar to‘g‘ri to‘ldirilishi kerak");
        }
        addMenuItem({ ...newMenuItem, id: Date.now() });
        toast.success(`"${name}" menyu itemi qo‘shildi`);
        setNewMenuItem({ name: "", categoryId: 0, price: 0 });
    };

    const handleAddTable = () => {
        if (newTable <= 0) return toast.error("Stol raqami noto‘g‘ri");
        addTable({ id: Date.now(), number: newTable });
        toast.success(`Stol #${newTable} qo‘shildi`);
        setNewTable(0);
    };

    const handleRemoveCategory = (id: number, name: string) => {
        removeCategory(id);
        toast.success(`"${name}" o‘chirildi`);
    };

    const handleRemoveMenuItem = (id: number, name: string) => {
        removeMenuItem(id);
        toast.success(`"${name}" menyudan o‘chirildi`);
    };

    const handleRemoveTable = (id: number, number: number) => {
        removeTable(id);
        toast.success(`Stol #${number} o‘chirildi`);
    };

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content="Restoran menejer paneli" />
            </Head>
            <div className="bg-white text-gray-800 min-h-screen py-8">
                <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
                    <h1 className="text-4xl font-bold text-center mb-10">
                        Menejer Dashboard
                    </h1>

                    <div className="space-y-12">
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">
                                Kategoriya Qo‘shish
                            </h2>
                            <Input
                                type="text"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                placeholder="Kategoriya nomi"
                            />
                            <Button onClick={handleAddCategory}>
                                Qo‘shish
                            </Button>
                            <h3 className="mt-6 font-semibold text-lg">
                                Kategoriya Ro‘yxati
                            </h3>
                            <ul>
                                {categories.map((category) => (
                                    <ListItem
                                        key={category.id}
                                        name={category.name}
                                        onDelete={() =>
                                            handleRemoveCategory(
                                                category.id,
                                                category.name
                                            )
                                        }
                                    />
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4">
                                Menyu Item Qo‘shish
                            </h2>
                            <Input
                                type="text"
                                value={newMenuItem.name}
                                onChange={(e) =>
                                    setNewMenuItem({
                                        ...newMenuItem,
                                        name: e.target.value,
                                    })
                                }
                                placeholder="Menyu nomi"
                            />
                            <Input
                                type="number"
                                value={
                                    newMenuItem.price <= 0
                                        ? ""
                                        : newMenuItem.price
                                }
                                onChange={(e) =>
                                    setNewMenuItem({
                                        ...newMenuItem,
                                        price: parseInt(e.target.value),
                                    })
                                }
                                placeholder="Narxi"
                            />
                            <Select
                                value={newMenuItem.categoryId}
                                onChange={(e) =>
                                    setNewMenuItem({
                                        ...newMenuItem,
                                        categoryId: parseInt(e.target.value),
                                    })
                                }
                                options={categories}
                            />
                            <Button onClick={handleAddMenuItem}>
                                Qo‘shish
                            </Button>
                            <h3 className="mt-6 font-semibold text-lg">
                                Menyu Ro‘yxati
                            </h3>
                            <ul>
                                {menuItems.map((item) => (
                                    <ListItem
                                        key={item.id}
                                        name={`${item.name} (${item.price} so'm)`}
                                        onDelete={() =>
                                            handleRemoveMenuItem(
                                                item.id,
                                                item.name
                                            )
                                        }
                                    />
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4">
                                Stol Qo‘shish
                            </h2>
                            <Input
                                type="number"
                                value={newTable <= 0 ? "" : newTable}
                                onChange={(e) =>
                                    setNewTable(parseInt(e.target.value))
                                }
                                placeholder="Stol raqami"
                            />
                            <Button onClick={handleAddTable}>Qo‘shish</Button>
                            <h3 className="mt-6 font-semibold text-lg">
                                Stol Ro‘yxati
                            </h3>
                            <ul>
                                {tables.map((table) => (
                                    <ListItem
                                        key={table.id}
                                        name={`Stol #${table.number}`}
                                        onDelete={() =>
                                            handleRemoveTable(
                                                table.id,
                                                table.number
                                            )
                                        }
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}