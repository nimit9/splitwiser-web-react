import { API_URL } from '@/config/constants';

import {
    UseMutationOptions,
    UseQueryOptions,
    useMutation,
    useQuery,
} from '@tanstack/react-query';

import axios, { AxiosError, AxiosResponse } from 'axios';

export const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

// Generic function to handle axios requests
const axiosRequest = async <T>(
    promise: Promise<AxiosResponse<T>>,
): Promise<T> => {
    try {
        const response = await promise;
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data.message || 'An error occurred',
            );
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};

// React Query hook for making GET requests
export const useApiQuery = <T>(
    key: string[],
    endpoint: string,
    options?: UseQueryOptions<T>,
) => {
    return useQuery<T>({
        queryKey: key,
        queryFn: () => axiosRequest<T>(api.get<T>(endpoint)),
        retry: false,
        ...options,
    });
};

// React Query hook for making POST requests
export const useApiMutation = <T, R>(
    endpoint: string,
    method: 'post' | 'put' | 'delete' | 'patch' = 'post',
    options?: UseMutationOptions<T, AxiosError, R>,
) => {
    return useMutation<T, AxiosError, R>({
        mutationFn: (data) => axiosRequest<T>(api[method]<T>(endpoint, data)),
        ...options,
    });
};
