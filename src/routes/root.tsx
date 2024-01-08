import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import { useApiLoading } from '@/context/apiLoadingContext';
import useAxiosInterceptor from '@/components/AxiosInterceptor';

const Root = () => {
    const { apiLoading } = useApiLoading();
    useAxiosInterceptor();

    return (
        <>
            {apiLoading ? (
                <div className="h-1 w-full overflow-hidden top-0 absolute">
                    <div className="animate-progress w-full h-full bg-primary origin-left-right"></div>
                </div>
            ) : null}
            <Toaster />
            <Outlet />
        </>
    );
};

export default Root;
