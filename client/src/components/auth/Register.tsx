'use client'

import { register } from "@/actions/auth.apis";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {

    const router = useRouter()

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });


    const { isPending, mutate, isError, error } = useMutation({
        mutationKey: ["register"],
        mutationFn: () => register(values.name, values.email, values.password),
        onSuccess: async () => {
            // we can save token, user data too
            router.push(`/login`)
        },
        onError: (error: any) => {
            console.error("register failed:", error.response?.data || error.message);
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate();
    };

    return (
        <section
            className="relative w-full bg-cover bg-center flex items-center justify-center min-h-screen"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/p/AF1QipOiz8wa0lQhdDXJVwGsYATLwdZYa-8gLbLaOm4=s680-w680-h510')" }}
        >
            <div className="relative z-10 inset-0 bg-black opacity-50"></div>
            <div className="w-full max-w-md p-8 space-y-8 bg-[#EFEBDA] shadow-lg rounded-lg">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-red-600">Restaurant Panda</h2>
                    <p className="mt-2 text-gray-600">
                        Rejoignez-nous pour une expérience culinaire incroyable !
                    </p>
                </div>
                <div className="flex justify-center mt-4">
                    <Link href="/login" className="text-red-500 font-semibold hover:underline">
                        Vous avez déjà un compte ? Connectez-vous
                    </Link>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-semibold" htmlFor="name">Username</label>
                        <input
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            placeholder="votre nom complet"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold" htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            placeholder="email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold" htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            placeholder="mot de pass"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-3 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        {isPending ? "Loading..." : "Registre"}
                    </button>
                </form>

                {isError && (
                    <div className="text-center text-red-600 mt-4">
                        {error instanceof Error ? error.message : "An error occurred"}
                    </div>
                )}
            </div>
        </section>
    )
};

export default Register;
