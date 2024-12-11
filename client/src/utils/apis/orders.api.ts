import axiosInstance from "../index";

export const getAllOrders = async () => {
    try {
        const response = await axiosInstance.get(`/orders`);
        return response.data;
    } catch (error: any) {
        // console.error("Error fetching user data:", error);
        throw new Error(error.response?.data?.msg || "An error occurred while fetching user data");
    }
};



export const createOrder = async (orderData: any) => {
    try {
        const response = await axiosInstance.post(`/orders`, orderData);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.msg || "An error occurred while creating the order");
    }
};


export const deleteOrder = async (orderId: string) => {
    try {
        const response = await axiosInstance.delete(`/orders/${orderId}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.msg || "An error occurred while deleting the order");
    }
};


/* 
{
    userId?: number;
    guestUser?:string,
    phoneNumber: string;
    address: string;
    orderDetails: Array<{
        name: string;
        price: number;
        category: string;
        amount: number;
    }>;
    orderTotal: number;
    extraInfo?: string;
}

*/