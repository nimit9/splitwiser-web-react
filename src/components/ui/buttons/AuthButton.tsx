const AuthSubmitButton = ({
    isDisabled,
    text,
    onSubmit,
    disabledText,
}: {
    isDisabled: boolean;
    text: string;
    onSubmit?: () => void;
    disabledText?: string;
}) => {
    return (
        <div className="w-full flex-col flex gap-2 text-center">
            <button
                type="submit"
                className="text-base group w-full uppercase rounded-md bg-primary text-white font-semibold py-3 text-center disabled:bg-primary-light"
                disabled={isDisabled}
                {...(onSubmit && { onClick: onSubmit })}
            >
                {disabledText && (
                    <span className="group-disabled:block hidden">
                        {disabledText}
                    </span>
                )}
                <span
                    className={`${disabledText ? 'group-disabled:hidden' : ''}`}
                >
                    {text.toLowerCase()}
                </span>
            </button>
        </div>
    );
};

export default AuthSubmitButton;
