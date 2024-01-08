import AuthSubmitButton from '@/components/ui/buttons/AuthButton';
import AuthInput from '@/components/ui/inputs/AuthInput';
import LinearProgressIndterminate from '@/components/ui/loaders/LinearProgressIndterminate';
import { IApiCurrentUserData, IApiData } from '@/types/api-data';
import { api, useApiMutation, useApiQuery } from '@/utils/axios-util';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useLoaderData, useNavigate } from 'react-router-dom';

const AddUserName = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const { isPending, data, error } = useApiQuery<
        IApiData<IApiCurrentUserData>
    >(['get-current-user'], '/auth/me');

    const mutation = useApiMutation('/profile/add-name', 'post', {
        onSuccess: (data: any) => {
            toast.success('Name added');
            navigate('/');
        },
    });

    if (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }

    if (isPending) {
        return 'Loading......Add Skeleton';
    }

    if (data) {
        if (data.data.user.name) {
            return <Navigate to="/" replace />;
        }
        return (
            <>
                {mutation.isPending ? <LinearProgressIndterminate /> : null}
                <div className="px-4 w-full flex flex-col mt-20">
                    <h1 className="text-lg font-bold text-primary">
                        Please tell us your full name
                    </h1>
                    <AuthInput
                        name="name"
                        value={name}
                        handleChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                    <AuthSubmitButton
                        text="Proceed"
                        onSubmit={() => {
                            mutation.mutate({ name });
                        }}
                        isDisabled={name.length < 2}
                        disabledText="Enter Name"
                    />
                </div>
            </>
        );
    }
};

export default AddUserName;
