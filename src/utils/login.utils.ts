import toast from 'react-hot-toast';
import { LoginInput } from '../components/login/LoginScreen';

export const sendOTP = async (loginInput: LoginInput) => {
    try {
        const res = await fetch(`http://localhost:8081/api/v1/auth/login`, {
            method: 'POST',
            body: JSON.stringify(loginInput),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        const data = await res.json();

        if (data.error) {
            toast.error(data.message);
        } else {
            return true;
        }
    } catch (error) {
        if (error instanceof Error) {
            toast(error.message);
        }
    }
};
