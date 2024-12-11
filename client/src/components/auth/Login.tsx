'use client'

import React, { useState } from "react";
import { login } from "@/utils/Apis/auth.api";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/AuthContext";
const Login = () => {
    const { saveUser } = useGlobalContext();
    const router = useRouter()

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const { isPending, mutate, isError, error } = useMutation({
        mutationKey: ["login"],
        mutationFn: () => login(values.email, values.password),
        onSuccess: async (data) => {
            // Save user data to context and cookies
            saveUser(data.user);
            router.push(`/profile`);
        },
        onError: (error: any) => {
            console.error("Login failed:", error.response?.data || error.message);
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
                        Bienvenue ! Veuillez vous connecter.
                    </p>
                </div>
                <div className="flex justify-center mt-4">
                    <Link href="/register" className="text-red-500 font-semibold hover:underline">
                        Vous n&apos;avez pas de compte ? Inscrivez-vous
                    </Link>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
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
                        {isPending ? "Loading..." : "se connecter"}
                    </button>
                </form>

                {isError && (
                    <div className="text-center text-red-600 mt-4">
                        {error instanceof Error ? error.message : "An error occurred"}
                    </div>
                )}

                <div className="text-center">
                    <Link href="#" className="text-sm text-gray-500 hover:underline">Mot de passe oublié?</Link>
                </div>
            </div>
        </section>
    )
};

export default Login;


// 'use client';

// import React, { useState } from "react";
// import { login } from "@/utils/Apis/auth.api";
// import { useMutation } from "@tanstack/react-query";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useGlobalContext } from "@/context/AuthContext";

// const Login = () => {
//     const { saveUser } = useGlobalContext();
//     const router = useRouter();

//     const [values, setValues] = useState({
//         email: '',
//         password: '',
//     });

//     const { isPending, mutate, isError, error } = useMutation({
//         mutationKey: ["login"],
//         mutationFn: () => login(values.email, values.password),
//         onSuccess: async (data) => {
//             if (data && data.user) {
//                 saveUser(data.user);
//                 router.push(`/profile`);
//             } else {
//                 console.error("Invalid user data received:", data);
//             }
//         },
//         onError: (error: any) => {
//             console.error("Login failed:", error.response?.data || error.message);
//         },
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setValues({ ...values, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         mutate();
//     };

//     return (
//         <section
//             className="relative w-full bg-cover bg-center flex items-center justify-center min-h-screen"
//             style={{ backgroundImage: "url('https://lh3.googleusercontent.com/p/AF1QipOiz8wa0lQhdDXJVwGsYATLwdZYa-8gLbLaOm4=s680-w680-h510')" }}
//         >
//             <div className="relative z-10 inset-0 bg-black opacity-50"></div>
//             <div className="w-full max-w-md p-8 space-y-8 bg-[#EFEBDA] shadow-lg rounded-lg">
//                 <div className="text-center">
//                     <h2 className="text-4xl font-bold text-red-600">Restaurant Panda</h2>
//                     <p className="mt-2 text-gray-600">
//                         Bienvenue ! Veuillez vous connecter.
//                     </p>
//                 </div>
//                 <div className="flex justify-center mt-4">
//                     <Link href="/register" className="text-red-500 font-semibold hover:underline">
//                         Vous n&apos;avez pas de compte ? Inscrivez-vous
//                     </Link>
//                 </div>

//                 <form className="space-y-6" onSubmit={handleSubmit}>
//                     <div>
//                         <label className="block text-gray-700 font-semibold" htmlFor="email">Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={values.email}
//                             onChange={handleChange}
//                             className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
//                             placeholder="email"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-gray-700 font-semibold" htmlFor="password">Password</label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={values.password}
//                             onChange={handleChange}
//                             className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
//                             placeholder="mot de pass"
//                             required
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         disabled={isPending}
//                         className="w-full py-3 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
//                     >
//                         {isPending ? "Loading..." : "se connecter"}
//                     </button>
//                 </form>

//                 {isError && (
//                     <div className="text-center text-red-600 mt-4">
//                         {error?.response?.data?.message || error?.message || "An error occurred"}
//                     </div>
//                 )}

//                 <div className="text-center">
//                     <Link href="#" className="text-sm text-gray-500 hover:underline">Mot de passe oublié?</Link>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Login;
