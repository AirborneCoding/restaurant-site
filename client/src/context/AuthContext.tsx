// import React, { useContext, useState, useEffect, ReactNode } from 'react';
// import Cookies from 'js-cookie';
// import axiosInstance from '@/utils';

// interface User {
//     userId: number;
//     name: string;
//     email: string;
//     role: string;
// }

// interface AppContextProps {
//     isLoading: boolean;
//     user: User | null;
//     saveUser: (user: User) => void;
//     logoutUser: () => Promise<void>;
// }

// const AppContext = React.createContext<AppContextProps | undefined>(undefined);

// interface AppProviderProps {
//     children: ReactNode;
// }

// const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [user, setUser] = useState<User | null>(null);

//     const saveUser = (user: User) => {
//         setUser(user);
//         // Save user data in cookies
//         Cookies.set('user', JSON?.stringify(user), { expires: 7 }); // Store for 7 days
//     };

//     const removeUser = () => {
//         setUser(null);
//         // Remove user data from cookies
//         Cookies.remove('user');
//     };

//     const checkUserFromCookie = () => {
//         const userData = Cookies?.get('user');
//         if (userData) {
//             setUser(JSON?.parse(userData)); // Set user from cookie
//         }
//         setIsLoading(false);
//     };

//     // const checkUserFromCookie = () => {
//     //     const userData = Cookies?.get('user');
//     //     if (userData) {
//     //         try {
//     //             setUser(JSON.parse(userData)); // Parse and set user if data exists
//     //         } catch (error) {
//     //             console.error("Error parsing user data:", error);
//     //         }
//     //     }
//     //     setIsLoading(false);
//     // };



//     const logoutUser = async () => {
//         try {
//             await axiosInstance.delete('/auth/logout');
//             removeUser();
//             window.location.reload();
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     useEffect(() => {
//         checkUserFromCookie(); // Check cookies for user data on load
//     }, []);

//     return (
//         <AppContext.Provider
//             value={{
//                 isLoading,
//                 user,
//                 saveUser,
//                 logoutUser,
//             }}
//         >
//             {children}
//         </AppContext.Provider>
//     );
// };

// export const useGlobalContext = (): AppContextProps => {
//     const context = useContext(AppContext);
//     if (context === undefined) {
//         throw new Error('useGlobalContext must be used within an AppProvider');
//     }
//     return context;
// };

// export { AppProvider };




import React, { useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import axiosInstance from '@/utils/index';

interface User {
    userId: number;
    name: string;
    email: string;
    role: string;
}

interface AppContextProps {
    isLoading: boolean;
    user: User | null;
    saveUser: (user: User) => void;
    logoutUser: () => Promise<void>;
}

const AppContext = React.createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    const saveUser = (user: User) => {
        setUser(user);
        Cookies.set('user', JSON.stringify(user), { expires: 7 });
    };

    const removeUser = () => {
        setUser(null);
        Cookies.remove('user');
    };

    const checkUserFromCookie = () => {
        const userData = Cookies.get('user');
        if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (error) {
                console.error("Error parsing user data from cookie:", error);
            }
        }
        setIsLoading(false);
    };

    const logoutUser = async () => {
        try {
            await axiosInstance.delete('/auth/logout');
            removeUser();
            window.location.reload();
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    useEffect(() => {
        checkUserFromCookie();
    }, []);

    return (
        <AppContext.Provider
            value={{
                isLoading,
                user,
                saveUser,
                logoutUser,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = (): AppContextProps => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within an AppProvider');
    }
    return context;
};

export { AppProvider };
