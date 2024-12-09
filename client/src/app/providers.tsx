'use client';
import { useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// redux
import { Provider } from 'react-redux';
import { AppStore, makeStore } from '@/redux/store';
import { AppProvider } from '@/context/AuthContext';

const Providers = ({ children }: { children: React.ReactNode }) => {

    // redux-tookit
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    // react-query
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        staleTime: 60000,
                        refetchInterval: 60000,
                        networkMode: "online"
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            <AppProvider>
                <Provider store={storeRef.current}>
                    {children}
                </Provider>
            </AppProvider>

        </QueryClientProvider>
    );
};

export default Providers;
