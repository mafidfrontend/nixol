"use client";

import { useState } from "react";

export default function AddWorker() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Waiter");
    const [loading, setLoading] = useState(false);

    const handleAddWorker = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(
                "https://fa3b4322-a35d-418d-81e3-857a6e53889e.mock.pstmn.io/workers",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, role, email }),
                }
            );

            if (!res.ok) {
                throw new Error("Xodimni qo‘shib bo‘lmadi");
            }

            const data = await res.json();
            alert(
                `✅ Yangi xodim qo‘shildi:\n🧑‍💼 Ismi: ${data.name}\n📧 Email: ${data.email}\n🔐 Parol: ${data.password}`
            );

            setName("");
            setEmail("");
            setRole("Waiter");
        } catch (error) {
            console.error(error);
            alert("❌ Xatolik yuz berdi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            <h2 className="text-xl font-bold mb-4 text-center">
                Yangi Xodim Qo‘shish
            </h2>
            <form onSubmit={handleAddWorker} className="space-y-4">
                <div>
                    <label className="block font-medium">Ism</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Rol</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="Waiter">Ofitsiant</option>
                        <option value="Chef">Oshpaz</option>
                        <option value="Manager">Menejer</option>
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    {loading ? "Yuklanmoqda..." : "Qo‘shish"}
                </button>
            </form>
        </div>
    );
}