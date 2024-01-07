import { ChangeEvent, RefObject } from 'react';

interface AuthInputProps {
    label?: string;
    name: string;
    value: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    inputRef: RefObject<HTMLInputElement>;
}

const AuthInput = ({
    name,
    label,
    value,
    handleChange,
    inputRef,
}: AuthInputProps) => {
    return (
        <div className="flex flex-col mt-2 mb-4">
            <label className="text-xs text-text-secondary">
                {label || '\xa0'}
            </label>
            {
                <div className="flex items-center gap-4">
                    {name === 'phone' && (
                        <span className="font-semibold text-text-secondary">
                            +91
                        </span>
                    )}
                    <input
                        type="text"
                        className="w-full text-xl outline-none font-semibold peer bg-transparent placeholder:px-1 border-b border-primary py-1"
                        value={value}
                        ref={inputRef}
                        autoComplete="off"
                        autoFocus
                        onChange={handleChange}
                        name={name}
                    />
                </div>
            }
        </div>
    );
};

export default AuthInput;
