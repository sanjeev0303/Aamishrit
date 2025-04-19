"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckUser } from "@/hooks/useCheckUser";
import { Spinner } from "@heroui/spinner";
import UserAddressForm from "@/components/user/UserAddressForm";

export default function CheckoutWrapper() {
    const router = useRouter();
    const { exists, loading, error } = useCheckUser();

    useEffect(() => {
        if (!loading) {
            if (exists === false) {
                router.replace("/user"); // user not in DB
            }
        }
    }, [loading, exists, router]);

    if (loading) return <Spinner />; // or just "Loading..."
    if (error) return <div>Error: {error.message}</div>;

    // ✅ User exists
    return (
        <div>
            <h1>Checkout</h1>
            <UserAddressForm isLoggedIn={true} />
        </div>
    );
}
