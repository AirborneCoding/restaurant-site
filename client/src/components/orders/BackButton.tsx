import React from "react";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";

const BackButton = () => (
    <div className="relative top-8">
        <Link
            className="hover:underline poppins text-gray-700 select-none flex items-center space-x-2"
            href="/menu"
        >
            <FaLongArrowAltLeft />
            <span>
                Retour au menu
            </span>
        </Link>
    </div>
);

export default BackButton;
