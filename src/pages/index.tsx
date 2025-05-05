"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        const userRole = localStorage.getItem("role");

        if (userRole) {
            switch (userRole) {
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
                    router.push("/login");
                    break;
            }
        } else {
            router.push("/login");
        }
    }, [router]);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Xush kelibsiz</h1>
            <p>Saytga kirish uchun tizimga kirishingiz kerak.</p>
        </div>
    );
}