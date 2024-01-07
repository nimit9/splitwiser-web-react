import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiArrowBack, BiPaste } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import OTPInput from '../ui/inputs/OTPInput';
import AuthSubmitButton from '../ui/buttons/AuthButton';
import { z } from 'zod';
import { sendOTP } from '@/utils/login.utils';

const validOTP = z.string().length(6).regex(/\d/);

const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
        2,
        '0',
    )}`;
};

const OTPScreen = ({
    otpSentTo,
    toggleOtpScreen,
}: {
    otpSentTo: string;
    toggleOtpScreen: () => void;
}) => {
    const navigate = useNavigate();

    const [otp, setOTP] = useState('');
    const [timer, setTimer] = useState(60); // Initial timer value in seconds
    const [isResendDisabled, setIsResendDisabled] = useState(true);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            clearInterval(interval);
            setIsResendDisabled(false);
        }

        return () => clearInterval(interval);
    }, [timer]);

    const handleResendClick = async () => {
        const success = await sendOTP({ phone: otpSentTo });
        setTimer(120);
        setIsResendDisabled(true);
    };

    const verifyOTP = async () => {
        try {
            const res = await fetch(
                `http://localhost:8081/api/v1/auth/verify-otp`,
                {
                    method: 'POST',
                    body: JSON.stringify({ otp }),
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                },
            );
            const data = await res.json();

            if (!data.success) {
                throw new Error(data.msg);
            } else {
                if (data.user.isVerified && !data.user.name) {
                    return navigate('/update-name');
                }
                navigate('/');
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };
    return (
        <>
            <div className="w-full p-4 bg-gray-200">
                <BiArrowBack size={24} onClick={toggleOtpScreen} />
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h1 className="text-lg uppercase font-bold mt-4">
                            Verify Details
                        </h1>
                        <span className="text-xs text-text-secondary font-medium">
                            OTP sent to {otpSentTo}
                        </span>
                    </div>
                    <img src="/otp.webp" width={120} height={72} alt="otp" />
                </div>
            </div>
            <div className="py-6 px-4 gap-8 flex flex-col">
                <div className="flex flex-col gap-2">
                    <span className="text-xs text-text-secondary font-medium uppercase">
                        Enter OTP
                    </span>

                    <div className="flex items-center gap-10">
                        <OTPInput
                            length={6}
                            onOTPChange={(otp: string) => {
                                setOTP(otp);
                            }}
                        />
                        <div className="flex items-center gap-1 text-xs text-primary">
                            <BiPaste />
                            <span>PASTE OTP</span>
                        </div>
                    </div>
                </div>

                <span className="text-xs text-text-secondary">
                    Didn't receive the OTP?&nbsp;
                    {isResendDisabled ? (
                        `Retry in ${formatTime(timer)}`
                    ) : (
                        <span
                            className="text-primary font-bold"
                            onClick={handleResendClick}
                        >
                            Resend OTP
                        </span>
                    )}
                </span>

                <AuthSubmitButton
                    text="Verify and Proceed"
                    isDisabled={!validOTP.safeParse(otp).success}
                    disabledText="Enter OTP"
                    onSubmit={verifyOTP}
                />
            </div>
        </>
    );
};

export default OTPScreen;
