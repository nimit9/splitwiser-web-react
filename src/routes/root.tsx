import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import { useApiLoading } from '@/context/apiLoadingContext';
import useAxiosInterceptor from '@/components/AxiosInterceptor';

const Root = () => {
    const { apiLoading } = useApiLoading();
    useAxiosInterceptor();

    return (
        <>
            <Toaster />
            <Outlet />
        </>
    );
};

export default Root;
