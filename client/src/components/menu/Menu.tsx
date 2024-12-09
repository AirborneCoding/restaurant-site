"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Img from "../shared/Img";
import { GPTmenu } from "@/utils/data";
import { addItem } from "@/redux/slices/order";

import CategoryButton from "./CategoryButton";
import MenuItemCard from "./MenuItemCard";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 6;

const Menu = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    const totalPages = Math.ceil(GPTmenu.length / ITEMS_PER_PAGE);
    const paginatedCategories = GPTmenu.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const toggleCategory = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((cat) => cat !== category)
                : [...prev, category]
        );
    };

    const displayedCategories =
        selectedCategories.length > 0
            ? GPTmenu.filter((cat) => selectedCategories.includes(cat.category))
            : paginatedCategories;

    const handleQuantityChange = (itemName: string, amount: number) => {
        setQuantities((prev) => ({
            ...prev,
            [itemName]: Math.max(amount, 1), 
        }));
    };

    const handleAddToCart = (menuItem: any, category: string) => {
        const quantity = quantities[menuItem.name] || 1;
        console.log(menuItem, category);

        dispatch(addItem({
            menuItem: {
                name: menuItem?.name,
                price: menuItem?.price,
                category: category,
                amount: quantity
            }
        }));
        setQuantities((prev) => ({
            ...prev,
            [menuItem.name]: 1, 
        }));
    };

    return (
        <div className="p-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
                {GPTmenu.map((cat) => (
                    <CategoryButton
                        key={cat.id}
                        category={cat.category}
                        isSelected={selectedCategories.includes(cat.category)}
                        onClick={() => toggleCategory(cat.category)}
                    />
                ))}
            </div>

            {/* Menu Items */}
            <section className="space-y-16">
                {displayedCategories.map((category: any) => (
                    <div key={category.id}>
                        <div className="relative">
                            <Img
                                className="w-full h-64 object-cover rounded-lg"
                                src={category?.image}
                                alt={category.category}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                <h2 className="text-3xl font-semibold text-white drop-shadow-md">
                                    {category.category}
                                </h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                            {category.items.map((menuItem: any) => (
                                <MenuItemCard
                                    key={menuItem.name}
                                    menuItem={menuItem}
                                    quantity={quantities[menuItem.name] || 1}
                                    setQuantity={(amount: number) =>
                                        handleQuantityChange(menuItem.name, amount)
                                    }
                                    handleAddToCart={() => handleAddToCart(menuItem, category.category)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            {/* Pagination */}
            {selectedCategories.length === 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    );
};

export default Menu;



// !good showing few items
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import Img from "../shared/Img";
// import { GPTmenu } from "@/utils/data";
// import { addItem } from "@/redux/slices/order";

// import CategoryButton from "./CategoryButton";
// import MenuItemCard from "./MenuItemCard";
// import Pagination from "./Pagination";

// const ITEMS_PER_PAGE = 6;

// const Menu = () => {
//     const dispatch = useDispatch();
//     const [currentPage, setCurrentPage] = useState(1);
//     const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//     const [quantities, setQuantities] = useState<Record<string, number>>({});
//     const [showAllCategories, setShowAllCategories] = useState(false); // State to toggle category visibility

//     const totalPages = Math.ceil(GPTmenu.length / ITEMS_PER_PAGE);
//     const paginatedCategories = GPTmenu.slice(
//         (currentPage - 1) * ITEMS_PER_PAGE,
//         currentPage * ITEMS_PER_PAGE
//     );

//     const toggleCategory = (category: string) => {
//         setSelectedCategories((prev) =>
//             prev.includes(category)
//                 ? prev.filter((cat) => cat !== category)
//                 : [...prev, category]
//         );
//     };

//     const displayedCategories =
//         selectedCategories.length > 0
//             ? GPTmenu.filter((cat) => selectedCategories.includes(cat.category))
//             : paginatedCategories;

//     const handleQuantityChange = (itemName: string, amount: number) => {
//         setQuantities((prev) => ({
//             ...prev,
//             [itemName]: Math.max(amount, 1),
//         }));
//     };

//     const handleAddToCart = (menuItem: any, category: string) => {
//         const quantity = quantities[menuItem.name] || 1;
//         console.log(menuItem, category);

//         dispatch(addItem({
//             menuItem: {
//                 name: menuItem?.name,
//                 price: menuItem?.price,
//                 category: category,
//                 amount: quantity
//             }
//         }));
//         setQuantities((prev) => ({
//             ...prev,
//             [menuItem.name]: 1,
//         }));
//     };

//     return (
//         <div className="p-6">
//             {/* Categories */}
//             <div className="flex flex-wrap gap-3 justify-center mb-8">
//                 {GPTmenu.slice(0, showAllCategories ? GPTmenu.length : 5).map((cat) => (  // Show up to 5 categories by default
//                     <CategoryButton
//                         key={cat.id}
//                         category={cat.category}
//                         isSelected={selectedCategories.includes(cat.category)}
//                         onClick={() => toggleCategory(cat.category)}
//                     />
//                 ))}
//             </div>

//             {/* "Show More" Button */}
//             {!showAllCategories && GPTmenu.length > 5 && (
//                 <div className="text-center">
//                     <button
//                         onClick={() => setShowAllCategories(true)}
//                         className="bg-primary text-white px-6 py-2 rounded-full hover:bg-black transition"
//                     >
//                         Voir plus de catégories
//                     </button>
//                 </div>
//             )}
//             {showAllCategories && (
//                 <div className="text-center">
//                     <button
//                         onClick={() => setShowAllCategories(false)}
//                         className="bg-primary text-white px-6 py-2 rounded-full hover:bg-black transition"
//                     >
//                         Voir moins de catégories
//                     </button>
//                 </div>
//             )}

//             {/* Menu Items */}
//             <section className="space-y-16">
//                 {displayedCategories.map((category: any) => (
//                     <div key={category.id}>
//                         <div className="relative">
//                             <Img
//                                 className="w-full h-64 object-cover rounded-lg"
//                                 src={category?.image}
//                                 alt={category.category}
//                             />
//                             <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//                                 <h2 className="text-3xl font-semibold text-white drop-shadow-md">
//                                     {category.category}
//                                 </h2>
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
//                             {category.items.map((menuItem: any) => (
//                                 <MenuItemCard
//                                     key={menuItem.name}
//                                     menuItem={menuItem}
//                                     quantity={quantities[menuItem.name] || 1}
//                                     setQuantity={(amount: number) =>
//                                         handleQuantityChange(menuItem.name, amount)
//                                     }
//                                     handleAddToCart={() => handleAddToCart(menuItem, category.category)}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </section>

//             {/* Pagination */}
//             {selectedCategories.length === 0 && (
//                 <Pagination
//                     currentPage={currentPage}
//                     totalPages={totalPages}
//                     onPageChange={setCurrentPage}
//                 />
//             )}
//         </div>
//     );
// };

// export default Menu;
