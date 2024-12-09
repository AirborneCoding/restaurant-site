import React from "react";

interface MenuItem {
    name: string;
    description?: string;
    price: number;
}

interface MenuItemCardProps {
    menuItem: MenuItem;
    quantity: number;
    setQuantity: (value: number) => void;
    handleAddToCart: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
    menuItem,
    quantity,
    setQuantity,
    handleAddToCart,
}) => {
    return (
        <div className="bg-white shadow-md border border-gray-100 rounded-lg p-4 flex flex-col hover:shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-lg font-bold text-gray-800">{menuItem.name}</h3>
            {menuItem.description && (
                <p className="text-sm text-gray-500 mt-2">{menuItem.description}</p>
            )}
            <div className="mt-auto">
                <h4 className="text-lg font-semibold text-gray-900 mt-4">{menuItem.price} DH</h4>
                <div>
                    <label
                        htmlFor={`quantity-${menuItem.name}`}
                        className="block font-medium text-gray-700"
                    >
                        Quantity:
                    </label>
                    <input
                        type="number"
                        id={`quantity-${menuItem.name}`}
                        className="mt-1 block w-20 pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        min="1"
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                        }
                    />
                </div>
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-primary text-white py-2 px-4 rounded-lg mt-3 transition-transform transform hover:scale-105"
                >
                    Commandez
                </button>
            </div>
        </div>
    );
};

export default MenuItemCard;