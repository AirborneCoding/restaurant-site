import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface User {
    userId: number;
    name: string;
    email: string;
    role: string;
}

interface UserState {
    isLoading: boolean;
    user: User | null;
}

const initialState: UserState = {
    isLoading: true,
    user: null,
};

// Async thunk for logging out the user
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
    await axios.delete('/api/v1/auth/logout');
    Cookies.remove('user'); // Remove from cookies after logout
    return null; // Return null to reset the user in the state
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            Cookies.set('user', JSON.stringify(action.payload), { expires: 7 });
        },
        removeUser: (state) => {
            state.user = null;
            Cookies.remove('user');
        },
        checkUserFromCookie: (state) => {
            const userData = Cookies.get('user');
            if (userData) {
                state.user = JSON.parse(userData);
            }
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isLoading = false;
            });
    },
});

export const { saveUser, removeUser, checkUserFromCookie } = userSlice.actions;

export default userSlice.reducer;
