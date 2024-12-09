// import React from "react";

// const EditAddress = () => {
//     return (
//         <dialog id="my_modal_2" className="modal">
//             <div className="modal-box">
//                 <form method="dialog">
//                     <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
//                 </form>
//                 <h3 className="font-bold text-lg">Hello!</h3>
//                 <form
//                     className="my-4">
//                     <div className="flex flex-col space-y-3">
//                         <input
//                             type="text"
//                             placeholder="Adresse"
//                             name="name"
//                             className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none glass transition duration-300 border border-gray-300 focus:shadow-xl"
//                             required
//                         />
//                         <input
//                             type="text"
//                             placeholder="Numéro de téléphone (requis)"
//                             name="phone"
//                             className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none glass transition duration-300 border border-gray-300 focus:shadow-xl"
//                             required
//                         />
//                         <button
//                             type='submit'
//                             className="w-full px-6 py-3 rounded-lg bg-black text-white">
//                             Edit
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </dialog>
//     )
// };

// export default EditAddress;



import { useAppDispatch, useAppSelector } from "@/hooks/redux/redux-toolkit";
import { setAddress, setPhone } from "@/redux/slices/order";
import { RootState } from "@/redux/store";
import React, { useState } from "react";



const EditAddress = () => {
    const dispatch = useAppDispatch();
    const address = useAppSelector((state: RootState) => state.orders.address);
    const phone = useAppSelector((state: RootState) => state.orders.phone);

    const [localAddress, setLocalAddress] = useState(address);
    const [localPhone, setLocalPhone] = useState(phone);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setAddress(localAddress));
        dispatch(setPhone(localPhone));
        alert("Address and phone saved!");
        const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
        if (modal) modal.close();
    };

    return (
        <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Edit Address</h3>
                <form className="my-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-3">
                        <input
                            type="text"
                            placeholder="Address"
                            value={localAddress}
                            onChange={(e) => setLocalAddress(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none glass transition duration-300 border border-gray-300 focus:shadow-xl"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Phone (required)"
                            value={localPhone}
                            onChange={(e) => setLocalPhone(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none glass transition duration-300 border border-gray-300 focus:shadow-xl"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full px-6 py-3 rounded-lg bg-black text-white">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default EditAddress;
