import Head from "next/head";
import { useState } from "react";

const buyurtmalar = [
    { id: 1, table: 5, status: "pending", items: ["Pizza", "Coca Cola"] },
    { id: 2, table: 3, status: "progress", items: ["Spaghetti", "Water"] },
    { id: 3, table: 8, status: "done", items: ["Burger", "Fanta"] },
];

export default function OshpazPage() {
    const [orders, setOrders] = useState(buyurtmalar);
    const [pageTitle] = useState("Chief Dashboard");

    const changeStatus = (orderId: number, newStatus: string) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content="Restoran oshpaz paneli" />
            </Head>
            <div className="p-8">
                <h1 className="text-2xl font-bold">Oshpaz Dashboard</h1>
                <div className="mt-6">
                    {orders
                        .filter((order) => order.status !== "done")
                        .map((order) => (
                            <div
                                key={order.id}
                                className="border p-4 mb-4 rounded"
                            >
                                <h3 className="font-semibold">
                                    Stol #{order.table}
                                </h3>
                                <ul className="mb-2">
                                    {order.items.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                                <div className="flex gap-4">
                                    {order.status === "pending" && (
                                        <button
                                            onClick={() =>
                                                changeStatus(
                                                    order.id,
                                                    "progress"
                                                )
                                            }
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                        >
                                            Qabul qilish
                                        </button>
                                    )}
                                    {order.status === "progress" && (
                                        <button
                                            onClick={() =>
                                                changeStatus(order.id, "done")
                                            }
                                            className="bg-green-500 text-white px-4 py-2 rounded"
                                        >
                                            Tayyor
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
