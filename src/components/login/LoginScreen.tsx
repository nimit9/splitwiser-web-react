'use client';

import toast from 'react-hot-toast';
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';

import { z } from 'zod';
import AuthInput from '../ui/inputs/AuthInput';
import AuthSubmitButton from '../ui/buttons/AuthButton';
import { sendOTP } from '../../utils/login.utils';

export type LoginInput = { phone?: string; email?: string } | null;

const validPhone = z.string().length(10).regex(/\d/);
const validEmail = z.string().email();

const LoginScreen = ({
    toggleOtpScreen,
    setOtpSentTo,
}: {
    toggleOtpScreen: () => void;
    setOtpSentTo: Dispatch<SetStateAction<string>>;
}) => {
    const [loginType, setLoginType] = useState<'phone' | 'email'>('phone');

    const emailLogin = loginType === 'email';

    const emailInputRef = useRef<HTMLInputElement>(null);
    const phoneInputRef = useRef<HTMLInputElement>(null);

    const [loginInput, setLoginInput] = useState<LoginInput>({
        phone: '9987207076',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginInput({ [e.target.name]: e.target.value });
    };

    const toggleBetweenLoginTypes = () => {
        if (phoneInputRef && phoneInputRef.current)
            phoneInputRef.current.focus();
        if (emailInputRef && emailInputRef.current)
            emailInputRef.current.focus();
        setLoginType((prevLoginType) => {
            const emailType = prevLoginType === 'email';

            emailType
                ? (
                      phoneInputRef?.current as unknown as HTMLInputElement
                  )?.focus()
                : (
                      emailInputRef?.current as unknown as HTMLInputElement
                  )?.focus();
            setLoginInput(null);
            return emailType ? 'phone' : 'email';
        });
    };

    const handleSubmit = async () => {
        const success = await sendOTP(loginInput);
        if (success) {
            setOtpSentTo(loginInput?.email! || loginInput?.phone!);
            toggleOtpScreen();
        }
    };

    return (
        <div className="fixed bottom-0 w-full border-t-2 overflow-hidden py-6 px-4 flex flex-col justify-between gap-4 mt-auto">
            <div>
                <div className="flex w-full justify-between items-center">
                    <h1 className="text-xl uppercase font-bold">Login</h1>
                    <span
                        className="text-base text-primary font-bold"
                        onClick={toggleBetweenLoginTypes}
                    >
                        Use {emailLogin ? 'phone' : 'email'}
                    </span>
                </div>
                <span className="text-xs text-text-secondary font-medium">
                    Enter your {emailLogin ? 'email' : 'phone number'} to
                    proceed
                </span>
            </div>

            {emailLogin ? (
                <AuthInput
                    name="email"
                    value={loginInput?.email || ''}
                    handleChange={handleInputChange}
                    inputRef={emailInputRef}
                />
            ) : (
                <AuthInput
                    name="phone"
                    value={loginInput?.phone || ''}
                    handleChange={handleInputChange}
                    inputRef={phoneInputRef}
                    label={'10 digit mobile number'}
                />
            )}

            <AuthSubmitButton
                isDisabled={
                    !loginInput ||
                    (!validEmail.safeParse(loginInput.email).success &&
                        !validPhone.safeParse(loginInput.phone).success)
                }
                text="Login"
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default LoginScreen;
