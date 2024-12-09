import React, { createContext, useContext, useReducer, useState, ReactNode } from "react";
import { toast } from "react-toastify";

// Define types
interface CartItem {
    cartID: number;
    name: string;
    category: string;
    image?: string;
    price: number;
    amount: number;
}

interface CartState {
    items: CartItem[];
    numItemsInCart: number;
    cartTotal: number;
    shipping: number;
    orderTotal: number;
    confi: boolean;
}

type CartAction =
    | { type: "ADD_ITEM"; payload: { menuItem: CartItem } }
    | { type: "REMOVE_ITEM"; payload: { itemName: string } }
    | { type: "EDIT_ITEM"; payload: { itemName: string; amount: number } }
    | { type: "CLEAR_CART" }
    | { type: "SET_CONFI"; payload: boolean };

// Define default state
const defaultState: CartState = {
    items: [],
    numItemsInCart: 0,
    cartTotal: 0,
    shipping: 20,
    orderTotal: 0,
    confi: false,
};

// Cart reducer function
function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD_ITEM": {
            const { menuItem } = action.payload;
            const existingItem = state.items.find((item) => item.name === menuItem.name);
            if (existingItem) {
                existingItem.amount += menuItem.amount;
            } else {
                state.items.push(menuItem);
            }
            const updatedState = {
                ...state,
                numItemsInCart: state.numItemsInCart + menuItem.amount,
                cartTotal: state.cartTotal + menuItem.price * menuItem.amount,
            };
            toast.success("Item added to cart");
            return { ...updatedState, orderTotal: updatedState.cartTotal + updatedState.shipping };
        }

        case "REMOVE_ITEM": {
            const { itemName } = action.payload;
            const item = state.items.find((item) => item.name === itemName);
            if (!item) return state;

            const updatedItems = state.items.filter((item) => item.name !== itemName);
            const updatedState = {
                ...state,
                items: updatedItems,
                numItemsInCart: state.numItemsInCart - item.amount,
                cartTotal: state.cartTotal - item.price * item.amount,
            };
            toast.error("Item removed from cart");
            return { ...updatedState, orderTotal: updatedState.cartTotal + updatedState.shipping };
        }

        case "EDIT_ITEM": {
            const { itemName, amount } = action.payload;
            const item = state.items.find((item) => item.name === itemName);
            if (!item) return state;

            const updatedState = {
                ...state,
                numItemsInCart: state.numItemsInCart + (amount - item.amount),
                cartTotal: state.cartTotal + item.price * (amount - item.amount),
            };
            item.amount = amount;
            toast.success("Cart updated");
            return { ...updatedState, orderTotal: updatedState.cartTotal + updatedState.shipping };
        }

        case "CLEAR_CART":
            return defaultState;

        case "SET_CONFI":
            return { ...state, confi: action.payload };

        default:
            return state;
    }
}

// Create context
const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
}>({ state: defaultState, dispatch: () => { } });

// Provide context to children
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, defaultState);

    return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);
