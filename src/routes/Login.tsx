import { useState } from 'react';

import LoginScreen from '../components/login/LoginScreen';
import OTPScreen from '../components/login/OTPScreen';

const Login = () => {
    const [showOtpScreen, setShowOtpScreen] = useState(false);

    const [otpSentTo, setOtpSentTo] = useState('');

    const toggleOtpScreen = () => {
        setShowOtpScreen((prev) => !prev);
    };

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
