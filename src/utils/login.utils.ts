import toast from 'react-hot-toast';
import { LoginInput } from '../components/login/LoginScreen';
import { api } from './axios-util';

export const sendOTP = async (loginInput: LoginInput) => {
    try {
        console.log('request');

        const data = await api.post('/auth/login', JSON.stringify(loginInput));

        if (data?.data?.error) {
            toast.error(data.data.message);
        } else {
            return true;
        }
    } catch (error) {
        if (error instanceof Error) {
            toast(error.message);
        }
    }
};
