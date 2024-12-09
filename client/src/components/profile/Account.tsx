import React from "react";
import { useGlobalContext } from "@/context/AuthContext";
import Link from "next/link";
import EditAddress from "./EditAddress";
import { useAppSelector } from "@/hooks/redux/redux-toolkit";
import { RootState } from "@/redux/store";

const Account = () => {
    const { user, logoutUser } = useGlobalContext();
    const address = useAppSelector((state: RootState) => state.orders.address);
    const phone = useAppSelector((state: RootState) => state.orders.phone);
    return (
        <>
            <aside className="lg:sticky lg:top-top-bar-spacing grid gap-6 h-min transition-all ease-linear">
                <div className="bg-gray-50/30 md:shadow-lg md:shadow-gray-300/20 md:rounded-theme-md border-y md:border-x border-gray-200 -mx-4 md:mx-0 py-4 px-6">
                    <h6 className="font-bold mb-3" >
                        Account ({user?.name})
                    </h6>
                    <nav className="grid gap-1 text-theme-text/70 text-sm">
                        {/* <a className="hover:underline hover:text-theme-text text-theme-text/90 font-semibold" href="/account">
                        Order History
                    </a> */}
                        <a className="hover:underline hover:text-theme-text" href="/account/addresses">
                            Account
                        </a>
                        <button
                            onClick={logoutUser}
                            className="hover:underline hover:text-theme-text text-start">
                            Log Out
                        </button>
                    </nav>
                </div>
                {/* hidden lg:!block */}
                <div className="block bg-gray-50/30 shadow-lg shadow-gray-300/20 rounded-theme-md border border-gray-200 py-4 px-6">
                    <h2 className="mb-3 flex justify-between items-baseline">
                        <span className="text-lg font-semibold">Default Address</span>
                        <button
                            onClick={() => {
                                const modal = document?.getElementById('my_modal_2') as HTMLDialogElement | null;
                                modal?.showModal();
                            }}
                            className="hover:underline text-sm text-theme-text/60 hover:text-theme-text"
                        >
                            Edit
                        </button>
                    </h2>
                    <div className="text-sm text-theme-text/70">
                        <p>
                            {user?.name}
                            <br />
                            {address}
                            <br />
                            {phone}
                        </p>
                    </div>
                </div>
                <p>
                    <button className="action-button account-button--primary rtxn_manage_subscriptions_btn_mobile">
                        <Link href="/">Airborne Heroes</Link>
                    </button>
                </p>
            </aside>
            <EditAddress />
        </>
    );
};

export default Account;