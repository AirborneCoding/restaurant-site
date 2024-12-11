'use client';
import React, { useEffect, useState } from 'react';
import BackButton from './BackButton';
import DeliveryForm from './DeliveryForm';
import OrderDetails from './OrderDetails';
import { useGlobalContext } from '@/context/AuthContext';
import { useAppDispatch, useAppSelector } from '@/hooks/redux/redux-toolkit';
import { setAddress, setClearAll, setConfi, setExtraInfo, setPhone } from '@/redux/slices/order';
import { useMutation } from '@tanstack/react-query';

import Confetti from 'react-confetti';
import { createOrder } from '@/actions/orders.api';

const OrdersMain = () => {
    const dispatch = useAppDispatch();
    const { user } = useGlobalContext();
    const [guestUser, setGuestUser] = useState(user?.name || '');
    const { items, address, phone, orderTotal, extraInfo, confi } = useAppSelector(
        (state) => state.orders
    );

    const { mutate: submitOrder, isError, isPending } = useMutation({
        mutationKey: ['create_order'],
        mutationFn: createOrder,
        onSuccess: () => {
            setGuestUser('');
            dispatch(setClearAll())
            dispatch(setConfi(true));
        },
    });

    useEffect(() => {
        if (confi) {
            const timer = setTimeout(() => dispatch(setConfi(false)), 3000);
            return () => clearTimeout(timer);
        }
    }, [confi, dispatch]);

    const handleSubmite = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const orderData = {
            userId: user?.userId,
            guestUser,
            phoneNumber: phone,
            address,
            orderDetails: items.map((item) => ({
                name: item.name,
                price: item.price,
                category: item.category,
                amount: item.amount,
            })),
            orderTotal,
            extraInfo,
        };

        submitOrder(orderData);

    };

    return (
        <div className="py-20">
            {confi && (
                <Confetti width={window.innerWidth} height={window.innerHeight} colors={['#222', '#fffff']} />
            )}

            <BackButton />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                <div className="col-span-1">
                    <div className="flex flex-col mt-20">
                        <h1 className="text-2xl poppins pb-4 border-b border-gray-500 text-gray-700">
                            Détails de livraison
                        </h1>
                        {
                            isError && (
                                <div className="text-sm mt-3 text-error">
                                    ⚠  quelque chose s&apos;est mal passé, veuillez réessayer ou revenir plus tard
                                </div>
                            )
                        }
                        <DeliveryForm
                            user={user}
                            guestUser={guestUser}
                            setGuestUser={setGuestUser}
                            setAddress={(value) => dispatch(setAddress(value))}
                            setPhone={(value) => dispatch(setPhone(value))}
                            setExtraInfo={(value) => dispatch(setExtraInfo(value))}
                            handleSubmite={handleSubmite}
                        />
                    </div>
                </div>
                <div className="col-span-1">
                    <OrderDetails
                        address={address}
                        phone={phone}
                        guestUser={guestUser}
                        handleSubmite={handleSubmite}
                    />
                </div>
            </div>
        </div>
    );
};

export default OrdersMain;
