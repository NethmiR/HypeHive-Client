import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import classNames from "classnames";

interface TextBoxProps {
    value: string;
    type?: string;
    placeholder: string;
    caption?: string;
    autoComplete?: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    width?: string;
    componentClassName?: string;
    captionClassName?: string;
    inputClassName?: string;
    errorText?: string;
    errorTextColor?: string;
    maxCharCount?: number;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
    uppercase?: boolean;
    backgroundColor?: string;
    borderColor?: string;
}

/**
 * TextBox component renders an input field with optional caption and error text.
 *
 * @param {TextBoxProps} props - The props for the TextBox component.
 * @returns {JSX.Element} The rendered TextBox component.
 */

const TextBox: React.FC<TextBoxProps> = ({
    value = "",
    type = "text",
    placeholder = "Placeholder",
    autoComplete = "off",
    onChange = () => { },
    disabled = false,
    width = "w-full",
    componentClassName = "",
    captionClassName = "",
    inputClassName = "",
    caption,
    errorText,
    errorTextColor = "text-red",
    maxCharCount,
    onKeyDown,
    uppercase = false,
    backgroundColor = "bg-white",
    borderColor = "border-gray-300",
}) => {
    const [internalErrorText, setInternalErrorText] = useState<string | undefined>(errorText);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;
        if (uppercase) {
            inputValue = inputValue.toUpperCase();
        }
        if (!maxCharCount || inputValue.length <= maxCharCount) {
            setInternalErrorText(undefined);
            onChange(inputValue);
        } else {
            setInternalErrorText(`Exceeded max count of ${maxCharCount}`);
        }
    };
    return (
        <div className={classNames(width, componentClassName)}>
            {caption && (
                <label
                    className={classNames(
                        "block mb-1 text-sm font-medium text-white",
                        captionClassName
                    )}
                >
                    {caption}
                </label>
            )}
            <input
                type={type}
                value={value}
                autoComplete={autoComplete}
                placeholder={placeholder}
                onChange={handleChange}
                onKeyDown={onKeyDown}
                disabled={disabled}
                className={classNames(
                    "block w-full rounded-md border px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-opacity-20 focus:ring-inset hover:ring-blue focus:ring-blue sm:text-sm sm:leading-6 duration-300 ease-in-out transition-all",
                    backgroundColor,
                    borderColor,
                    inputClassName
                )}
            />
            {(internalErrorText || errorText) && (
                <p className={classNames("mt-1 text-xs", errorTextColor)}>
                    {internalErrorText || errorText}
                </p>
            )}
        </div>
    );
};

export default TextBox;