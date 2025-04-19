"use client";

import { useState } from "react";
import { useCreateUser } from "@/hooks/useCreateUser";

export default function UserNameForm() {
    const [name, setName] = useState("");
    const { submit, loading, error } = useCreateUser();
    const [formError, setFormError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return setFormError("Name cannot be empty");

        await submit({ name });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full space-y-6"
            >
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                    Welcome! Let's get your name
                </h2>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {(formError || error) && (
                    <p className="text-red-500 text-sm">
                        {formError || error}
                    </p>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}
