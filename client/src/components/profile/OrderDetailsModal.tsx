// import React from "react";

// const OrderDetailsModal = ({ order, onClose }: { order: any; onClose: () => void }) => {
//     if (!order) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
//                 <h2 className="text-lg font-semibold mb-4">Order Details</h2>
//                 <div className="space-y-2">
//                     <p><strong>Order ID:</strong> {order.id}</p>
//                     <p><strong>Phone:</strong> {order.phoneNumber}</p>
//                     <p><strong>Address:</strong> {order.address}</p>
//                     <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
//                     <p><strong>Status:</strong> {order.orderState}</p>
//                     {/* <p><strong>Order Details:</strong> {order.orderDetails || "N/A"}</p> */}
//                 </div>
//                 <button
//                     onClick={onClose}
//                     className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                 >
//                     Close
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default OrderDetailsModal;


import React from "react";
import Img from "../shared/Img";
import { useGlobalContext } from "@/context/AuthContext";

const OrderDetailsModal = ({ order, onClose }: { order: any; onClose: () => void }) => {
    // if (!order) return null;
    const { user } = useGlobalContext();
    console.log(user);

    return (

        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <h2 className="text-lg font-semibold mb-4">Order Details</h2>
                <div className="flex flex-col space-y-4 mb-3">

                    <p className="poppins text-gray-700">
                        {
                            user?.role === "admin" ?
                                <>
                                    Livrer à: <span className="font-semibold text-black">{order?.user?.name || order?.guestUser}</span>
                                </> :
                                <>
                                    Livrer à: <span className="font-semibold text-black">{order?.user?.name}</span>
                                </>
                        }

                    </p>
                    <p className="poppins text-gray-700">
                        téléphone: <span className="font-semibold text-black">{order?.phoneNumber}</span>
                    </p>
                    <p className="poppins text-gray-700">
                        Lieu de livraison: <span className="font-semibold text-black">{order?.address}</span>
                    </p>

                    <p className="poppins text-gray-700">
                        Nombre de commande: <span className="font-semibold text-black">
                            {order?.orderDetails.length}
                        </span>
                    </p>

                    <p className="poppins text-gray-700">
                        Date de commande: <span className="font-semibold text-black">
                            {new Date(order?.orderDate).toLocaleDateString()}
                        </span>
                    </p>

                    <p className="poppins text-gray-700">
                        detail de commande: <span className="font-bold">({order?.orderTotal} DH)</span>
                    </p>
                    <br />
                    <div className="flex flex-col gap-y-2 h-64 overflow-y-scroll">
                        {order?.orderDetails?.map((item: any, idx: number) => (
                            <div key={item?.name} className="rounded-lg py-1.5 flex space-x-3">
                                {/* <p>
                                    {idx + 1}
                                </p> */}
                                <Img
                                    className="w-16 h-16 rounded object-contain"
                                    // src={item?.image || ""}
                                    src="https://allmenus.ma/wp-content/uploads/2024/07/panda-rabat-logo.jpg"
                                    alt={item?.name} />
                                <div className="flex flex-col gap-y-1 flex-grow">
                                    <h5 className="text-base poppins text-gray-700">
                                        {item?.name}
                                    </h5>
                                    <h1 className="font-semibold text-sm text-primary poppins">
                                        {item?.price} DH
                                    </h1>
                                    <p className="text-xs poppins text-gray-400">{item?.category}</p>
                                </div>
                                <div className="flex items-center px-4 py-2 space-x-3">
                                    <span className="text-lg text-gray-700 poppins select-none">
                                        {item?.amount}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                {/* <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Close
                </button> */}
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>

        </dialog >
    );
};

export default OrderDetailsModal;