import { KeyboardEvent, useEffect, useRef, useState } from 'react';

const OTPInput = ({
    length,
    onOTPChange,
    pastedOTP,
}: {
    length: number;
    onOTPChange: (otp: string) => void;
    pastedOTP: string;
}) => {
    const [otpInput, setOtpInput] = useState(new Array(length).fill(''));

    useEffect(() => {
        onOTPChange(otpInput.toString().replaceAll(',', ''));
    }, [otpInput]);

    const otpBoxRef = useRef<HTMLInputElement[]>([]);

    useEffect(() => {
        setOtpInput(pastedOTP.split(''));
    }, [pastedOTP]);

    function handleChange(value: string, index: number) {
        if (value.length > 1) {
            return;
        }
        let newArr = [...otpInput];
        newArr[index] = value;
        setOtpInput(newArr);

        if (value && index < length - 1) {
            otpBoxRef.current[index + 1].focus();
        }
    }

    function handleBackspaceAndEnter(
        e: KeyboardEvent<HTMLInputElement>,
        index: number,
    ) {
        if (e.key === 'ArrowLeft' && index > 0) {
            otpBoxRef.current[index - 1].focus();
        }
        if (e.key === 'ArrowRight' && index < length - 1) {
            otpBoxRef.current[index + 1].focus();
        }
        if (
            e.key === 'Backspace' &&
            !(e.target as HTMLInputElement).value &&
            index > 0
        ) {
            otpBoxRef.current[index - 1].focus();
        }
        if (
            (e.key === 'Enter' || e.key === 'ArrowRight') &&
            (e.target as HTMLInputElement).value &&
            index < length - 1
        ) {
            otpBoxRef.current[index + 1].focus();
        }
    }
    return (
        <div className="flex items-center gap-2 flex-1">
            {Array.from({ length }).map((_, index) => {
                return (
                    <input
                        className="border-b-2 p-2 w-1/6 text-center focus:border-primary outline-none caret-transparent"
                        key={index}
                        onChange={(e) => handleChange(e.target.value, index)}
                        value={otpInput[index] || ''}
                        onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                        ref={(reference) =>
                            (otpBoxRef.current[index] = reference!)
                        }
                        maxLength={1}
                        type="number"
                    />
                );
            })}
        </div>
    );
};

export default OTPInput;
