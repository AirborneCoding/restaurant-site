import React from "react";

interface CategoryButtonProps {
    category: string;
    isSelected: boolean;
    onClick: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category, isSelected, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-full ${isSelected ? "bg-primary text-white" : "bg-black text-white"
                } hover:bg-primary hover:text-white transition`}
        >
            {category}
        </button>
    );
};

export default CategoryButton;
