import toast from 'react-hot-toast';
import { LoginInput } from '../components/login/LoginScreen';
import { api } from './axios-util';

export const sendOTP = async (loginInput: LoginInput) => {
    try {
        const response = await api.post(
            '/auth/login',
            JSON.stringify(loginInput),
        );

        if (response?.data?.error) {
            toast.error(response.data.message);
        } else {
            return true;
        }
    } catch (error) {
        if (error instanceof Error) {
            toast(error.message);
        }
    }
};
