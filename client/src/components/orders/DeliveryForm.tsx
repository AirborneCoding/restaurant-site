'use client'
import React from "react";
import { useAppSelector } from "@/hooks/redux/redux-toolkit";

interface DeliveryFormProps {
    user: any;
    guestUser: string; // For guest users
    setGuestUser: (value: string) => void; // Update guest user name
    setAddress: (value: string) => void;
    setPhone: (value: string) => void;
    setExtraInfo: (value: string) => void;

    handleSubmite: any
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({
    user,
    guestUser,
    setGuestUser,
    setAddress,
    setPhone,
    setExtraInfo,
    handleSubmite
}) => {


    const { items, address, phone, orderTotal, extraInfo } = useAppSelector(
        (state) => state.orders
    );

    const handleGuestNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGuestUser(e.target.value);
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };

    const handleExtraInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setExtraInfo(e.target.value);
    };

    return (
        <form
            onSubmit={handleSubmite}
            className="my-4">
            <div className="flex flex-col space-y-3">
                {/* If the user is logged in, display their name, otherwise show an input for guest name */}
                <input
                    type="text"
                    placeholder="Votre nom (requis)"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none glass transition duration-300 border border-gray-300 focus:shadow-xl"
                    value={guestUser || (user?.name || "")} // Default to user name if logged in
                    onChange={handleGuestNameChange}
                    required
                />
                <input
                    type="text"
                    placeholder="Numéro de téléphone (requis)"
                    name="phone"
                    value={phone}
                    className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none glass transition duration-300 border border-gray-300 focus:shadow-xl"
                    onChange={handlePhoneChange}
                    required
                />
                <input
                    type="text"
                    placeholder="Adresse (requis)"
                    name="address"
                    value={address}
                    className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none glass transition duration-300 border border-gray-300 focus:shadow-xl"
                    onChange={handleAddressChange}
                    required
                />
                <textarea
                    name="extraInfo"
                    value={extraInfo}
                    className="w-full px-2 py-5 rounded-lg ring-red-200 focus:ring-4 focus:outline-none glass transition duration-300 border border-gray-300 focus:shadow-xl"
                    placeholder="Avez-vous plus de détails sur votre commande... (facultatif)"
                    onChange={handleExtraInfoChange}
                />
                <button
                    type='submit'
                    disabled={!items.length || !address.trim() || !phone.trim() || orderTotal <= 0}
                    className="w-full px-6 py-3 rounded-lg bg-black text-white">
                    Commander
                </button>
            </div>
        </form>
    );
};

export default DeliveryForm;
