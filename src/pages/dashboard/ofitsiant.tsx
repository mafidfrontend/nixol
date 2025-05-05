"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { toast } from "sonner";
import { useOrderStore } from "@/store/stor";

const menuItems = [
    { id: 1, name: "Pizza", price: 15 },
    { id: 2, name: "Burger", price: 10 },
    { id: 3, name: "Spaghetti", price: 12 },
    { id: 4, name: "Coca Cola", price: 3 },
    { id: 5, name: "Fanta", price: 3 },
];

export default function OfitsiantPage() {
    const [pageTitle] = useState("Waiter Dashboard");
    const router = useRouter();

    const orderItems = useOrderStore((state) => state.orderItems);
    const selectedTable = useOrderStore((state) => state.selectedTable);
    const addItem = useOrderStore((state) => state.addItem);
    const removeItem = useOrderStore((state) => state.removeItem);
    const setTable = useOrderStore((state) => state.setTable);
    const submitOrder = useOrderStore((state) => state.submitOrder);

    const handleAddItem = (item: {
        id: number;
        name: string;
        price: number;
    }) => {
        addItem(item);
        toast.success(`"${item.name}" qo‘shildi`);
    };

    const handleRemoveItem = (id: number) => {
        removeItem(id);
        toast.warning(`Item removed from your order.`);
    };

    const handleSubmitOrder = () => {
        if (!selectedTable) {
            toast.error("Iltimos, stol raqamini tanlang!");
            return;
        }

        toast.success(`Buyurtma stol #${selectedTable} ga tayyorlanishga yuborildi!`);

        submitOrder();

        router.push("/dashboard");
    };

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content="Restoran ofitsiant paneli" />
            </Head>
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Ofitsiant Dashboard</h1>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold">
                        Stol raqamini tanlang
                    </h2>
                    {[1, 2, 3, 4, 5].map((table) => (
                        <button
                            key={table}
                            onClick={() => setTable(table)}
                            className={`mr-2 mb-2 p-2 border ${
                                selectedTable === table
                                    ? "bg-blue-500 text-white"
                                    : ""
                            }`}
                        >
                            Stol #{table}
                        </button>
                    ))}
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Menyu</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {menuItems.map((item) => (
                            <div key={item.id} className="border p-4 rounded">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p>{item.price} USD</p>
                                <button
                                    onClick={() => handleAddItem(item)}
                                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Qo'shish
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Buyurtmalar</h2>
                    <div className="border p-4 rounded">
                        {orderItems.length === 0 ? (
                            <p>Hech qanday buyurtma qo'shilmagan.</p>
                        ) : (
                            <ul>
                                {orderItems.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between"
                                    >
                                        <span>{item.name}</span>
                                        <button
                                            onClick={() =>
                                                handleRemoveItem(item.id)
                                            }
                                            className="text-red-500"
                                        >
                                            O'chirish
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div>
                    <button
                        onClick={handleSubmitOrder}
                        className="bg-blue-500 text-white px-6 py-2 rounded"
                    >
                        Buyurtmani yuborish
                    </button>
                </div>
            </div>
        </>
    );
}