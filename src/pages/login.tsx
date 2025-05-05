"use client";
import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (email === "admin@nt.uz" && password === "pass123") {
            localStorage.setItem("role", role);
            switch (role) {
                case "ofitsiant":
                    router.push("/dashboard/ofitsiant");
                    break;
                case "menejer":
                    router.push("/dashboard/menejer");
                    break;
                case "oshpaz":
                    router.push("/dashboard/oshpaz");
                    break;
                default:
                    alert("Noto&apos;g&apos;ri rol tanlandi");
                    break;
            }
        } else {
            alert("Login yoki parol noto&apos;g&apos;ri!");
        }
    };

    return (
        <div className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">
                Tizimga Kirish
            </h1>

            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block font-semibold">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block font-semibold">
                        Parol
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="role" className="block font-semibold">
                        Rol tanlang
                    </label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Rolni tanlang</option>
                        <option value="ofitsiant">Ofitsiant</option>
                        <option value="menejer">Menejer</option>
                        <option value="oshpaz">Oshpaz</option>
                    </select>
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Kirish
                    </button>
                </div>
            </form>
        </div>
    );
}