// 'use client';

// import React, { useState, useEffect } from 'react';
// import Img from '../shared/Img';
// import { FaRegUserCircle } from "react-icons/fa";
// import Link from 'next/link';
// import { useGlobalContext } from '@/context/AuthContext';
// import { FaShoppingCart } from "react-icons/fa";
// import { useAppSelector } from '@/hooks/redux/redux-toolkit';

// const Navbar = () => {
//     const { user } = useGlobalContext();
//     const { numItemsInCart } = useAppSelector(state => state.orders)
//     const [changeHeader, setChangeHeader] = useState(false);

//     // Header change function
//     const onChangeHeader = () => {
//         if (window.scrollY >= 50) {
//             setChangeHeader(true);
//         } else {
//             setChangeHeader(false);
//         }
//     };

//     // Add event listener for scrolling
//     useEffect(() => {
//         window.addEventListener('scroll', onChangeHeader);
//         return () => {
//             window.removeEventListener('scroll', onChangeHeader);
//         };
//     }, []);



//     return (
//         <header
//             className={`${changeHeader ? 'bg-black shadow-md' : 'bg-transparent'
//                 } fixed z-50 top-0 left-0 w-full transition duration-500`}
//         >
//             <nav className="flex items-center body-container py-3">
//                 {/* Left - Logo */}
//                 <Link href='/' className="flex flex-grow">
//                     <Img
//                         className="w-10 h-10 cursor-pointer rounded-full"
//                         src="https://allmenus.ma/wp-content/uploads/2024/07/panda-rabat-logo.jpg"
//                         alt="Logo de la restaurant Panda"
//                     />
//                 </Link>

//                 <div className='flex justify-between gap-x-5 '>
//                     {/* Center - Navigation Links */}
//                     <ul
//                         className={`hidden md:flex items-center space-x-6 !font-pandaFont1  ${changeHeader ? 'text-white' : 'text-white'
//                             } `}
//                     >
//                         <li>
//                             <Link href="/" className="hover:text-primary poppins">
//                                 <h5>
//                                     Accueil
//                                 </h5>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link href="/menu" className=" hover:text-primary poppins">
//                                 <h5>
//                                     Menu
//                                 </h5>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link href="/about" className=" hover:text-primary poppins">
//                                 <h5>
//                                     À propos
//                                 </h5>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link href="/contact" className=" hover:text-primary poppins">
//                                 <h5>
//                                     Contact
//                                 </h5>
//                             </Link>
//                         </li>
//                     </ul>

//                     {/* Right - Authentication */}
//                     <div className="flex items-center justify-end gap-x-6">
//                         {user ? (
//                             // User is logged in
//                             <div className='flex gap-x-2 items-center'>

//                                 <Link
//                                     href="/profile"
//                                     className={`mt-1.5 ${changeHeader ? 'text-white' : 'text-black'
//                                         } `}
//                                 >
//                                     <FaRegUserCircle size={20} />
//                                 </Link>
//                                 <Link
//                                     href='/orders'
//                                     className={`mt-1.5 ${changeHeader ? 'text-white' : 'text-black'
//                                         } `}
//                                 >
//                                     {/* <FaRegUserCircle size={20} /> */}

//                                     <div className="indicator">
//                                         <span className="indicator-item badge-sm badge badge-accent">
//                                             {numItemsInCart}
//                                         </span>
//                                         <div className="grid place-items-center">
//                                             <FaShoppingCart size={20} color='white' />
//                                         </div>
//                                     </div>
//                                 </Link>
//                             </div>
//                         ) : (
//                             // User is not logged in
//                                 <div className='flex gap-x-2 items-center'>
//                                 <Link
//                                     href="/login"
//                                     className="poppins text-gray-700 hover:text-primary"
//                                 >
//                                         <FaRegUserCircle size={20} />
//                                 </Link>
//                                 <Link
//                                     href='/orders'
//                                     className={`mt-1.5 ${changeHeader ? 'text-white' : 'text-black'
//                                         } `}
//                                 >
//                                     {/* <FaRegUserCircle size={20} /> */}

//                                     <div className="indicator">
//                                         <span className="indicator-item badge-sm badge badge-accent">
//                                             {numItemsInCart}
//                                         </span>
//                                         <div className="grid place-items-center">
//                                             <FaShoppingCart size={20} color='white'/>

//                                         </div>
//                                     </div>
//                                 </Link>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </nav>
//         </header>
//     );
// };

// export default Navbar;



'use client';

import React, { useState, useEffect } from 'react';
import Img from '../shared/Img';
import { FaRegUserCircle, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import Link from 'next/link';
import { useGlobalContext } from '@/context/AuthContext';
import { useAppSelector } from '@/hooks/redux/redux-toolkit';
import Theme from '../shared/Theme';

const Navbar = () => {
    const { user } = useGlobalContext();
    const { numItemsInCart } = useAppSelector(state => state.orders);
    const [changeHeader, setChangeHeader] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Header change function
    const onChangeHeader = () => {
        setChangeHeader(window.scrollY >= 50);
    };

    // Add event listener for scrolling
    useEffect(() => {
        window.addEventListener('scroll', onChangeHeader);
        return () => {
            window.removeEventListener('scroll', onChangeHeader);
        };
    }, []);

    // Toggle Sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <header
            className={`${changeHeader ? 'bg-black shadow-md' : 'bg-transparent'
                } fixed z-50 top-0 left-0 w-full transition duration-500`}
        >
            <nav className="flex items-center body-container py-3">
                {/* Left - Logo */}
                <Link href='/' className="flex flex-grow">
                    <Img
                        className="w-10 h-10 cursor-pointer rounded-full"
                        src="https://allmenus.ma/wp-content/uploads/2024/07/panda-rabat-logo.jpg"
                        alt="Logo de la restaurant Panda"
                    />
                </Link>

                {/* Hamburger Menu for Small Screens */}
                <button
                    onClick={toggleSidebar}
                    className="text-white md:hidden text-2xl"
                >
                    {sidebarOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Sidebar */}
                <div
                    className={`fixed top-0 right-0 h-full w-64 bg-black text-white transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'
                        } transition-transform duration-300 md:hidden z-40`}
                >
                    <div className="flex items-center justify-between px-4 py-4">
                        <h2 className="text-xl font-bold">Menu</h2>
                        <button onClick={toggleSidebar} className="text-white text-2xl">
                            <FaTimes />
                        </button>
                    </div>
                    <ul className="flex flex-col space-y-6 mt-6 pl-6">
                        <li>
                            <Link href="/" onClick={toggleSidebar} className="hover:text-primary">
                                Accueil
                            </Link>
                        </li>
                        <li>
                            <Link href="/menu" onClick={toggleSidebar} className="hover:text-primary">
                                Menu
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" onClick={toggleSidebar} className="hover:text-primary">
                                À propos
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" onClick={toggleSidebar} className="hover:text-primary">
                                Contact
                            </Link>
                        </li>
                    </ul>
                    <div className="flex flex-col items-start mt-10 pl-6 space-y-6">
                        {user ? (
                            <>
                                <Link
                                    href="/profile"
                                    onClick={toggleSidebar}
                                    className="flex items-center gap-2 hover:text-primary"
                                >
                                    <FaRegUserCircle size={20} />
                                    <span>Profile</span>
                                </Link>
                                <Link
                                    href="/orders"
                                    onClick={toggleSidebar}
                                    className="flex items-center gap-2 hover:text-primary"
                                >
                                    <div className="indicator">
                                        <span className="indicator-item badge-sm badge badge-accent">
                                            {numItemsInCart}
                                        </span>
                                        <FaShoppingCart size={20} />
                                    </div>
                                    <span>Cart</span>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    onClick={toggleSidebar}
                                    className="flex items-center gap-2 hover:text-primary"
                                >
                                    <FaRegUserCircle size={20} />
                                    <span>Login</span>
                                </Link>
                                <Link
                                    href="/orders"
                                    onClick={toggleSidebar}
                                    className="flex items-center gap-2 hover:text-primary"
                                >
                                    <div className="indicator">
                                        <span className="indicator-item badge-sm badge badge-accent">
                                            {numItemsInCart}
                                        </span>
                                        <FaShoppingCart size={20} />
                                    </div>
                                    <span>Cart</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                <div className="hidden md:flex justify-between gap-x-5">
                    {/* Center - Navigation Links */}
                    <ul
                        className={`flex items-center space-x-6 !font-pandaFont1 ${changeHeader ? 'text-white' : 'text-black'
                            }`}
                    >
                        <li>
                            <Link href="/" className="hover:text-primary poppins text-white text-3xl">
                                Accueil
                            </Link>
                        </li>
                        <li>
                            <Link href="/menu" className="hover:text-primary poppins text-white text-3xl">
                                Menu
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:text-primary poppins text-white text-3xl">
                                À propos
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-primary poppins text-white text-3xl">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Right - Authentication */}
                <div className="hidden md:flex items-center justify-end gap-x-6 md:ml-5">
                    {user ? (
                        <div className="flex gap-x-2 items-center">
                            <Link
                                href="/profile"
                                className={`mt-1.5 ${changeHeader ? 'text-white' : 'text-black'}`}
                            >
                                <FaRegUserCircle size={20} />
                            </Link>
                            <Link
                                href="/orders"
                                className={`mt-1.5 ${changeHeader ? 'text-white' : 'text-black'}`}
                            >
                                <div className="indicator">
                                    <span className="indicator-item badge-sm badge badge-accent">
                                        {numItemsInCart}
                                    </span>
                                    <div className="grid place-items-center">
                                        <FaShoppingCart size={20} color="white" />
                                    </div>
                                </div>
                            </Link>
                            <Theme />
                        </div>
                    ) : (
                        <div className="flex gap-x-2 items-center">
                            <Link
                                href="/login"
                                className="poppins text-gray-400 hover:text-primary"
                            >
                                <FaRegUserCircle size={22} />
                            </Link>
                            <Link
                                href="/orders"
                                className={`mt-1.5 ${changeHeader ? 'text-white' : 'text-black'}`}
                            >
                                <div className="indicator">
                                    <span className="indicator-item badge-sm badge badge-accent">
                                        {numItemsInCart}
                                    </span>
                                    <div className="grid place-items-center">
                                        <FaShoppingCart size={20} color="white" />
                                    </div>
                                </div>
                            </Link>
                            <Theme />
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
