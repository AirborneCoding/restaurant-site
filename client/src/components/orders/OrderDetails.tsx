'use client'

import React from "react";
import Img from "@/components/shared/Img";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/redux-toolkit";
import { clearCart, removeItem } from "@/redux/slices/order";
import Link from "next/link";

interface OrderDetailsProps {
    address: string;
    phone: string;
    guestUser: string

    handleSubmite: any
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ address, phone, guestUser, handleSubmite }) => {
    const dispatch = useAppDispatch();
    const { items, cartTotal, orderTotal, shipping, numItemsInCart } = useAppSelector(
        (state) => state.orders
    );

    console.log(items);


    return (
        <div className="glass p-6 box-border rounded-lg">
            <div className="flex flex-col space-y-4 mb-3">

                <p className="poppins text-gray-700">
                    Livrer à: <span className="font-semibold text-black">{guestUser || "-----"}</span>
                </p>
                <p className="poppins text-gray-700">
                    téléphone: <span className="font-semibold text-black">{phone || "-----"}</span>
                </p>
                <p className="poppins text-gray-700">
                    Lieu de livraison: <span className="font-semibold text-black">{address || "-----"}</span>
                </p>

                <p className="poppins text-gray-700">
                    Nombre de commande: <span className="font-semibold text-black">{numItemsInCart}</span>
                </p>
            </div>

            {
                items.length === 0 ?
                    (
                        <div className="grid place-content-center gap-y-2 h-64">
                            <Link
                                href='/menu'
                                className="btn text-white bg-primary-content"
                            >
                                ajoutez vos commandes
                            </Link>
                        </div>
                    ) :
                    (
                        <div className="flex flex-col gap-y-2 h-64 overflow-y-scroll orderContainer">
                            {items.map((item: any) => (
                                <div key={item?.name} className="rounded-lg p-4 flex space-x-3">
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
                                    <button
                                        onClick={() => dispatch(removeItem({ itemName: item?.name }))}
                                        className="flex flex-col items-center justify-center">
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth={0}
                                            viewBox="0 0 1024 1024"
                                            className="w-6 h-6 text-gray-600 transform transition hover:scale-105 duration-500 cursor-pointer"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )
            }
            <div className="flex flex-col space-y-3 my-4">
                <div className="flex items-center">
                    <span className="flex-grow poppins text-gray-700">Sous-total</span>
                    <span className="poppins font-semibold text-black">{cartTotal} DH</span>
                </div>
                <div className="flex items-center">
                    <span className="flex-grow poppins text-gray-700">Frais de livraison</span>
                    <span className="poppins font-semibold text-black">{shipping} DH</span>
                </div>
                <div className="flex items-center">
                    <span className="flex-grow poppins text-gray-700 text-xl">Total</span>
                    <span className="poppins font-semibold text-black text-xl">{orderTotal} DH</span>
                </div>
            </div>
            <div className="flex justify-between gap-2">
                {/* <button
                    type="submit"
                    onClick={handleSubmite}
                    className="w-full px-3 py-1 rounded-lg bg-black text-white"
                >Passer une commande</button> */}
                <button
                    disabled={items.length === 0}
                    onClick={() => dispatch(clearCart())} className="w-full px-3 py-1 rounded-lg bg-black text-white">
                    Vider le panier
                </button>
            </div>
        </div>
    );
};

export default OrderDetails;
