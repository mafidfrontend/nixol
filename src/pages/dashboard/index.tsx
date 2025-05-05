import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function DashboardPage() {
    const [role, setRole] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        if (!storedRole) {
            router.push("/login");
        } else {
            setRole(storedRole);
        }
    }, [router]);

    if (!role) return <div>Loading...</div>;

    if (role === "menejer") {
        router.push("/dashboard/menejer");
    } else if (role === "ofitsiant") {
        router.push("/dashboard/ofitsiant");
    } else if (role === "oshpaz") {
        router.push("/dashboard/oshpaz");
    }

    return null;
}