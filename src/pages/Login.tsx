import { useState } from 'react';

import LoginScreen from '../components/login/LoginScreen';
import OTPScreen from '../components/login/OTPScreen';
import { API_URL } from '@/config/constants';

const Login = () => {
    const [showOtpScreen, setShowOtpScreen] = useState(false);

    console.log('process', API_URL);

    const [otpSentTo, setOtpSentTo] = useState('');

    const toggleOtpScreen = () => {
        setShowOtpScreen((prev) => !prev);
    };

    console.log(showOtpScreen);

    return showOtpScreen ? (
        <OTPScreen otpSentTo={otpSentTo} toggleOtpScreen={toggleOtpScreen} />
    ) : (
        <LoginScreen
            toggleOtpScreen={toggleOtpScreen}
            setOtpSentTo={setOtpSentTo}
        />
    );
};

export default Login;
