import { useApiLoading } from '@/context/apiLoadingContext';
import { api } from '@/utils/axios-util';
import { useEffect } from 'react';

const useAxiosInterceptor = () => {
    const { updateApiLoading } = useApiLoading();

    useEffect(() => {
        api.interceptors.request.use(
            (config) => {
                updateApiLoading(true);
                return config;
            },
            (error) => {
                updateApiLoading(false);
                return Promise.reject(error);
            },
        );
        api.interceptors.response.use(
            (response) => {
                updateApiLoading(false);
                return response;
            },
            (error) => {
                updateApiLoading(false);
                return Promise.reject(error);
            },
        );
    }, []);
};

export default useAxiosInterceptor;
