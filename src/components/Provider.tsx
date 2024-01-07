import ApiLoadingProvider from '@/context/apiLoadingContext';
import { ReactNode } from 'react';

const AppProvider = ({ children }: { children: ReactNode }) => {
    return <ApiLoadingProvider>{children}</ApiLoadingProvider>;
};

export default AppProvider;
