// src/app/checkout/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CheckoutWrapper from "./CheckoutWrapper";

export default async function CheckoutPage() {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in?redirect_url=/checkout");
    }

    return <CheckoutWrapper />;
}
