import React from "react";

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

function BuyurtmaYuborish({ orders = [] }: { orders?: Order[] }) {
    return (
        <div className="mt-10">
            <h2 className="text-xl font-bold mb-2">Buyurtma Tarixi</h2>
            {orders.length === 0 ? (
                <p>Hozircha buyurtmalar mavjud emas.</p>
            ) : (
                <ul className="space-y-2">
                    {orders.map((order, i) => (
                        <li key={i} className="border p-3 rounded">
                            <p className="font-semibold mb-1">
                                Stol #{order.table} |{" "}
                                {new Date(order.createdAt).toLocaleString()}
                            </p>
                            <ul className="pl-4 list-disc">
                                {order.items.map((item, j) => (
                                    <li key={j}>
                                        {item.name} × {item.quantity} —{" "}
                                        {item.price} USD
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default BuyurtmaYuborish;
