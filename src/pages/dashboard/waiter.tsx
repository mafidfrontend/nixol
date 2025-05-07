"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { toast } from "sonner";
import { useOrderStore } from "@/store/useOrderStore";
import { MenuItem } from "@/types/types";
import dynamic from "next/dynamic";

export default function OfitsiantPage() {
    const BuyurtmaYuborish = dynamic(
        () => import("./_components/BuyurtmaYuborish"),
        { ssr: false }
    );
    const [pageTitle] = useState("Waiter Dashboard");
    const selectedTable = useOrderStore((state) => state.selectedTable);
    const orderItems = useOrderStore((state) => state.orderItems);
    const orders = useOrderStore((state) => state.orders ?? []);
    const addItem = useOrderStore((state) => state.addItem);
    const removeItem = useOrderStore((state) => state.removeItem);
    const setTable = useOrderStore((state) => state.setTable);
    const submitOrder = useOrderStore((state) => state.submitOrder);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

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
        toast.warning(`Buyurtma element o‘chirildi`);
    };

    const handleSubmitOrder = async () => {
        if (!selectedTable) {
            toast.error("Iltimos, stol raqamini tanlang!");
            return;
        }

        const items = orderItems[selectedTable] || [];
        if (items.length === 0) {
            toast.error("Buyurtma bo‘sh. Hech nima tanlanmagan.");
            return;
        }

        try {
            const response = await fetch(
                "https://fa3b4322-a35d-418d-81e3-857a6e53889e.mock.pstmn.io/orders",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        table: selectedTable,
                        items,
                        createdAt: new Date().toISOString(),
                        status: "pending",
                    }),
                }
            );

            const data = await response.json();

            toast.success(`Buyurtma #${data.id} yuborildi!`);
            submitOrder();
        } catch (error) {
            console.error("Buyurtma yuborishda xatolik:", error);
            toast.error("Buyurtma yuborilmadi.");
        }
    };

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await fetch(
                    "https://fa3b4322-a35d-418d-81e3-857a6e53889e.mock.pstmn.io/menu"
                );
                const data = await res.json();
                setMenuItems(data);
            } catch (err) {
                console.error("Menyu yuklashda xatolik:", err);
                toast.error("Menyu yuklanmadi");
            } finally {
            }
        };

        fetchMenu();
    }, []);

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content="Restoran ofitsiant paneli" />
            </Head>
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Ofitsiant Dashboard</h1>

                {selectedTable && (
                    <div className="mb-4 text-lg font-medium text-green-700">
                        📌 Hozirda buyurtma qabul qilinmoqda:{" "}
                        <b>Stol #{selectedTable}</b>
                    </div>
                )}

                <div className="mb-6">
                    <h2 className="text-xl font-semibold">
                        Stol raqamini tanlang
                    </h2>
                    {[1, 2, 3, 4, 5].map((table) => (
                        <button
                            key={table}
                            onClick={() => setTable(table)}
                            className={`mr-2 mb-2 p-2 border rounded ${
                                selectedTable === table
                                    ? "bg-blue-500 text-white"
                                    : "bg-white"
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
                                    Qo&apos;shish
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Buyurtmalar</h2>
                    <div className="border p-4 rounded">
                        {selectedTable &&
                        orderItems[selectedTable].length > 0 ? (
                            <ul>
                                {orderItems[selectedTable].map((item) => (
                                    <li
                                        key={item.id}
                                        className="flex justify-between items-center mb-1"
                                    >
                                        <span>
                                            {item.name} × {item.quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                handleRemoveItem(item.id)
                                            }
                                            className="text-red-500"
                                        >
                                            O&apos;chirish
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Hech qanday buyurtma qo&apos;shilmagan.</p>
                        )}
                    </div>
                </div>

                <div className="mb-6">
                    <button
                        onClick={handleSubmitOrder}
                        className="bg-blue-500 text-white px-6 py-2 rounded"
                    >
                        Buyurtmani yuborish
                    </button>
                </div>

                <BuyurtmaYuborish orders={orders ?? []} />
            </div>
        </>
    );
}
