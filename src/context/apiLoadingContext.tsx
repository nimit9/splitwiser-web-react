import { LoadingContextType } from '@/types/api-loading';
import { ReactNode, createContext, useContext, useState } from 'react';

export const useApiLoading = () => {
    const context = useContext(ApiLoadingContext);

    if (!context) {
        throw new Error('useApiLoading must be used inside ApiProvider');
    }

    return context;
};

export const ApiLoadingContext = createContext<LoadingContextType | null>(null);

const ApiLoadingProvider = ({ children }: { children: ReactNode }) => {
    const [apiLoading, setApiLoading] = useState(false);

    const updateApiLoading = (loading: boolean) => {
        setApiLoading(loading);
    };

    return (
        <ApiLoadingContext.Provider value={{ apiLoading, updateApiLoading }}>
            {children}
        </ApiLoadingContext.Provider>
    );
};

export default ApiLoadingProvider;
