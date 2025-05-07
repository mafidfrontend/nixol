import Head from "next/head";
import { useEffect, useRef } from "react";
import { useOrderStore } from "@/store/useOrderStore";
import { toast } from "sonner";

export default function OshpazPage() {
    const orders = useOrderStore((state) => state.orders);
    const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);

    console.log(orders)

    const prevPendingCount = useRef(0);

    useEffect(() => {
        const currentPending = orders.filter(
            (order) => order.status === "pending"
        ).length;

        if (currentPending > prevPendingCount.current) {
            toast.info("Yangi buyurtma tushdi!");
        }

        prevPendingCount.current = currentPending;
    }, [orders]);

    const handleAccept = (orderId: number) => {
        updateOrderStatus(orderId, "progress");
        toast.success("Buyurtma tayyorlanmoqda");
    };

    const handleComplete = (orderId: number) => {
        updateOrderStatus(orderId, "done");
        toast.success("Buyurtma tayyor bo‘ldi");
    };

    return (
        <>
            <Head>
                <title>Chief Dashboard</title>
                <meta name="description" content="Restoran oshpaz paneli" />
            </Head>
            <div className="p-8">
                <h1 className="text-2xl font-bold">Oshpaz Dashboard</h1>
                <div className="mt-6">
                    {orders.filter((order) => order.status !== "done")
                        .length === 0 && (
                        <p className="text-gray-500">
                            Hozircha tayyorlanadigan buyurtmalar yo‘q.
                        </p>
                    )}

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
                                    {order.items.map((item, j) => (
                                        <li key={j}>
                                            {item.name} × {item.quantity}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex gap-4">
                                    {order.status === "pending" && (
                                        <button
                                            onClick={() =>
                                                handleAccept(order.id)
                                            }
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                        >
                                            Qabul qilish
                                        </button>
                                    )}
                                    {order.status === "progress" && (
                                        <button
                                            onClick={() =>
                                                handleComplete(order.id)
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
