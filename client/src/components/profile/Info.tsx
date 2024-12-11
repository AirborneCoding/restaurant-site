'use client';

import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import LogoLoader from "../shared/LogoLoader";
import Account from "./Account";
import Orders from "./Orders";
import { getAllOrders } from "@/utils/Apis/orders.api";
const Info = () => {


    // console.log(data);


    //admin => id , date , status , clientname, phone , adress , order details(in modal)

    //client => id , date , status , phone , adress , order details(in modal)


    return (
        <section className="grid lg:grid-cols-[240px_1fr] gap-8">
            <Account />
            <Orders />
        </section>
    );
};

export default Info;



/* 
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.users);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["user"],
        queryFn: showMe,
    });

    useEffect(() => {
        if (data?.user) {
            dispatch(saveUser({ user: data?.user }));
        }
    }, [data, dispatch]);

    if (isLoading) return <LogoLoader />
    if (isError) return <div>Error: {error?.message || "Failed to load user data."}</div>;

*/