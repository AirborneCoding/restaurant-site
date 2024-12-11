import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const isBrowser = typeof window !== 'undefined';
interface CartItem {
    name: string;
    category?: string;
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
    address: string;
    phone: string;
    extraInfo: string;
}

const defaultState: CartState = {
    items: [],
    numItemsInCart: 0,
    cartTotal: 0,
    shipping: 20,
    orderTotal: 0,
    confi: false,
    // address: '',
    // phone: '',
    // address: localStorage.getItem('cart_address') || '',
    // phone: localStorage.getItem('cart_phone') || '',
    address: isBrowser ? localStorage.getItem('cart_address') || '' : '',
    phone: isBrowser ? localStorage.getItem('cart_phone') || '' : '',
    extraInfo: '',
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: defaultState,
    reducers: {
        addItem(state, action: PayloadAction<{ menuItem: CartItem }>) {
            const { menuItem } = action.payload;
            const existingItem = state.items.find((item) => item.name === menuItem.name);
            if (existingItem) {
                existingItem.amount += menuItem.amount;
            } else {
                state.items.push(menuItem);
            }
            state.numItemsInCart += menuItem.amount;
            state.cartTotal += menuItem.price * menuItem.amount;
            cartSlice.caseReducers.calculateTotals(state);
        },
        removeItem(state, action: PayloadAction<{ itemName: string }>) {
            const { itemName } = action.payload;
            const item = state.items.find((item) => item.name === itemName);
            if (item) {
                state.items = state.items.filter((item) => item.name !== itemName);
                state.numItemsInCart -= item.amount;
                state.cartTotal -= item.price * item.amount;
                cartSlice.caseReducers.calculateTotals(state);
            }
        },
        clearCart() {
            return defaultState;
        },
        calculateTotals(state) {
            state.orderTotal = state.cartTotal + state.shipping;
        },
        setConfi(state, action: PayloadAction<boolean>) {
            state.confi = action.payload;
        },
        // setAddress(state, action: PayloadAction<string>) {
        //     state.address = action.payload;
        // },
        // setPhone(state, action: PayloadAction<string>) {
        //     state.phone = action.payload;
        // },
        // setAddress(state, action: PayloadAction<string>) {
        //     state.address = action.payload;
        //     localStorage.setItem('cart_address', action.payload);
        // },
        // setPhone(state, action: PayloadAction<string>) {
        //     state.phone = action.payload;
        //     localStorage.setItem('cart_phone', action.payload);
        // },

        setAddress(state, action: PayloadAction<string>) {
            state.address = action.payload;
            if (typeof window !== 'undefined') {
                localStorage.setItem('cart_address', action.payload);
            }
        },
        setPhone(state, action: PayloadAction<string>) {
            state.phone = action.payload;
            if (typeof window !== 'undefined') {
                localStorage.setItem('cart_phone', action.payload);
            }
        },

        setExtraInfo(state, action: PayloadAction<string>) {
            state.extraInfo = action.payload;
        },
        setClearAll(state) {
            Object.assign(state, defaultState);
        },
    },
});

export const { addItem, removeItem, clearCart, calculateTotals, setConfi, setAddress, setPhone, setExtraInfo, setClearAll } =
    cartSlice.actions;
export default cartSlice.reducer;
