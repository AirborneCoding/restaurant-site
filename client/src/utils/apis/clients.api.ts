import axiosInstance from "../axiosInstance";

export const showMe = async () => {
    try {
        const response = await axiosInstance.get(`/users/showMe`);
        return response.data;
    } catch (error: any) {
        // console.error("Error fetching user data:", error);
        throw new Error(error.response?.data?.msg || "An error occurred while fetching user data");
    }
};
