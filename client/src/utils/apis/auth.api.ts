import axiosInstance from "../axiosInstance";

// Register API call
export const register = async (name: string, email: string, password: string) => {
    try {
        const response = await axiosInstance.post(`/auth/register`, {
            name,
            email,
            password
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.msg || "An error occurred during register");

    }
};

// Login API call
export const login = async (email: string, password: string) => {

    try {
        const response = await axiosInstance.post(`/auth/login`, {
            email,
            password
        });
        return response.data;
    } catch (error: any) {
        console.log(error);

        throw new Error(error.response?.data?.msg || "An error occurred during login");

    }
};



