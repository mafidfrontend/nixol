"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(
                "https://fa3b4322-a35d-418d-81e3-857a6e53889e.mock.pstmn.io/workers"
            );

            console.log("Status:", res.status);

            if (!res.ok) {
                throw new Error("Xodimlar ro‘yxatini olishda xatolik");
            }

            const data = await res.json();

            const user = data.find(
                (user: {
                    id: number;
                    name: string;
                    role: string;
                    password: string;
                    email: string;
                }) => user.email === email && user.password === password
            );
            

            console.log("Topilgan foydalanuvchi:", user);

            if (user) {
                localStorage.setItem("role", user.role);
                router.push(`/dashboard/${user.role.toLowerCase()}`);
            } else {
                toast("❌ Email yoki parol noto‘g‘ri yoki role mavjud emas!");
            }
        } catch (err) {
            console.error(err);
            toast("Server bilan bog‘lanishda xatolik yuz berdi!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">
                Tizimga Kirish
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block font-semibold">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold">Parol</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded"
                    disabled={loading}
                >
                    {loading ? "Yuklanmoqda..." : "Kirish"}
                </button>
            </form>
        </div>
    );
}
