"use client";
import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {

        e.preventDefault();

        
        const users = [
            {
                email: "of@nt.uz",
                password: "pass123",
                role: "ofitsiant",
            },
            { email: "men@nt.uz", password: "pass123", role: "menejer" },
            { email: "osh@nt.uz", password: "pass123", role: "oshpaz" },
        ];

        const foundUser = users.find(
            (user) => user.email === email && user.password === password
        );

        if (foundUser) {
            localStorage.setItem("role", foundUser.role);
            router.push(`/dashboard/${foundUser.role}`);
        } else {
            alert("Email yoki parol noto‘g‘ri!");
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
