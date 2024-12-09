// "use client";

// import { getAllOrders } from "@/utils/apis/orders.api";
// import { useQuery } from "@tanstack/react-query";
// import React, { useState } from "react";
// import OrderDetailsModal from "./OrderDetailsModal";

// const statusStyles: { [key: string]: string } = {
//     pending: "border-l-4 border-yellow-500",
//     completed: "border-l-4 border-green-500 ",
//     canceled: "border-l-4 border-red-500",
//     in_progress: "border-l-4 border-blue-500",
// };

// const Orders: React.FC = () => {
//     const { data, isLoading, isError, error } = useQuery({
//         queryKey: ["orders"],
//         queryFn: getAllOrders,
//     });

//     const [selectedOrder, setSelectedOrder] = useState<any>(null);

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (isError) {
//         return <div>Error: {error.message}</div>;
//     }

//     if (!data || data.orders.length === 0) {
//         return <div>fait une ordre.</div>;
//     }

//     const { orders } = data

//     return (
//         <section>
//             <header className="sm:flex sm:items-center">
//                 <div className="sm:flex-auto">
//                     <h1 className="text-xl font-semibold text-gray-900">
//                         Orders ({orders.length})
//                         {/* Orders (0) */}
//                     </h1>
//                     <p className="mt-2 text-sm text-gray-700">View all your past orders.</p>
//                 </div>
//             </header>
//             <main className="mt-8 grid">
//                 <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                     <div className="inline-block min-w-full align-middle md:px-6 lg:px-8">
//                         <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
//                             <table className="min-w-full divide-y divide-gray-300">
//                                 <thead className="bg-gray-50">
//                                     <tr>
//                                         <th
//                                             scope="col"
//                                             className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
//                                         >
//                                             Order ID
//                                         </th>
//                                         <th
//                                             scope="col"
//                                             className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//                                         >
//                                             Date
//                                         </th>
//                                         <th
//                                             scope="col"
//                                             className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//                                         >
//                                             Status
//                                         </th>
//                                         <th
//                                             scope="col"
//                                             className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//                                         >
//                                             Phone
//                                         </th>
//                                         <th
//                                             scope="col"
//                                             className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//                                         >
//                                             Address
//                                         </th>
//                                         <th
//                                             scope="col"
//                                             className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//                                         >
//                                             Actions
//                                         </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-gray-200 bg-white">
//                                     {orders?.map((order: any) => {
//                                         const rowClassName = statusStyles[order.orderState] || "";
//                                         return (
//                                             <tr
//                                                 // key={order.id}
//                                                 // className={`${statusStyles[order.orderState] || ""
//                                                 //     }`}
//                                             key={order.id} className={rowClassName}
//                                             >
//                                                 <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
//                                                     {order.id}
//                                                 </td>
//                                                 <td className="px-3 py-4 text-sm text-gray-500">
//                                                     {new Date(order.orderDate).toLocaleDateString()}
//                                                 </td>
//                                                 <td className="px-3 py-4 text-sm text-gray-500">
//                                                     {order.orderState.replace("_", " ")}
//                                                 </td>
//                                                 <td className="px-3 py-4 text-sm text-gray-500">
//                                                     {order.phoneNumber}
//                                                 </td>
//                                                 <td className="px-3 py-4 text-sm text-gray-500">
//                                                     {order.address}
//                                                 </td>
//                                                 <td className="px-3 py-4 text-sm text-right flex space-x-1">
//                                                     <button
//                                                         onClick={() => {
//                                                             setSelectedOrder(order);
//                                                             const modal = document?.getElementById('my_modal_1') as HTMLDialogElement | null;
//                                                             modal?.showModal();
//                                                         }}
//                                                         className="text-indigo-600 hover:text-indigo-900"
//                                                     >
//                                                         Voir les détails
//                                                     </button>

//                                                     <button
//                                                         className="flex flex-col items-center justify-center">
//                                                         <svg
//                                                             stroke="currentColor"
//                                                             fill="currentColor"
//                                                             strokeWidth={0}
//                                                             viewBox="0 0 1024 1024"
//                                                             className="w-4 h-4 text-gray-600 transform transition hover:scale-105 duration-500 cursor-pointer"
//                                                             height="1em"
//                                                             width="1em"
//                                                             xmlns="http://www.w3.org/2000/svg"
//                                                         >
//                                                             <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" />
//                                                         </svg>
//                                                     </button>
//                                                 </td>
//                                             </tr>
//                                         )
//                                     })}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//             <OrderDetailsModal
//                 order={selectedOrder}
//                 onClose={() => setSelectedOrder(null)}
//             />
//         </section>
//     );
// };

// export default Orders

//! 
"use client";

import { getAllOrders, deleteOrder } from "@/utils/apis/orders.api"; // Import deleteOrder
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";

const statusStyles: { [key: string]: string } = {
    pending: "border-l-4 border-yellow-500",
    completed: "border-l-4 border-green-500",
    canceled: "border-l-4 border-red-500",
    in_progress: "border-l-4 border-blue-500",
};

const Orders: React.FC = () => {
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["orders"],
        queryFn: getAllOrders,
    });

    const deleteOrderMutation = useMutation({
        // mutationKey: ["orders"],
        mutationFn: deleteOrder,
        onSuccess: () => {
            // Invalidate the query to refresh the order list
            // queryClient.invalidateQueries(["orders"]);
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
        onError: (error: any) => {
            alert(error.message || "Failed to delete the order.");
        },
    });


    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    if (!data || data.orders.length === 0) {
        return <div>No orders available.</div>;
    }

    const { orders } = data;

    const handleDelete = (orderId: string) => {
        // if (window.confirm("Are you sure you want to delete this order?")) {
        //     deleteOrderMutation.mutate(orderId);
        // }
        deleteOrderMutation.mutate(orderId);
    };

    return (
        <section>
            <header className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">
                        Orders ({orders.length})
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">View all your past orders.</p>
                </div>
            </header>
            <main className="mt-8 grid">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Order ID
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Date
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Status
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Phone
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Address
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {orders?.map((order: any) => {
                                        const rowClassName = statusStyles[order.orderState] || "";
                                        return (
                                            <tr key={order.id} className={rowClassName}>
                                                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {order.id}
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-500">
                                                    {new Date(order.orderDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-500">
                                                    {order.orderState.replace("_", " ")}
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-500">
                                                    {order.phoneNumber}
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-500">
                                                    {order.address}
                                                </td>
                                                <td className="px-3 py-4 text-sm text-right flex space-x-1">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedOrder(order);
                                                            const modal = document?.getElementById('my_modal_1') as HTMLDialogElement | null;
                                                            modal?.showModal();
                                                        }}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        View Details
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(order.id)}
                                                        className="flex flex-col items-center justify-center"
                                                    >
                                                        <svg
                                                            stroke="currentColor"
                                                            fill="currentColor"
                                                            strokeWidth={0}
                                                            viewBox="0 0 1024 1024"
                                                            className="w-4 h-4 text-gray-600 transform transition hover:scale-105 duration-500 cursor-pointer"
                                                            height="1em"
                                                            width="1em"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <OrderDetailsModal
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
            />
        </section>
    );
};

export default Orders;
