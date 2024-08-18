import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { InputError } from './toolTipError';
import { findInputError } from '@/helpers/findInputError.helpers';
import "../styles/animations.css"

export const InputWithLabel: React.FC<{ event?: (event: React.ChangeEvent<HTMLInputElement>) => void, value?: string | number, label: string, name: string, type: string, id: string, placeholder: string, inputStyles?: React.CSSProperties, disabled?: boolean}> 
= ({ event, value, label, name, type, id, placeholder, inputStyles, disabled }) => {

    // Se extrae register, un hook que se encarga de tener disponible su valor en el contexto del formulario
    const { register, formState: { errors }, trigger } = useFormContext()
    const inputError = findInputError(errors, name)
    const isInvalid = Object.keys(inputError).length > 0

    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <div className='relative'>
            <div className="flex flex-col w-full py-2">
                <label
                    htmlFor={id}
                    className={`font-[500] text-sm pb-2 ${isFocused ? 'text-primaryColor font-bold' : 'text-slate-800'}`}
                >
                    {label}
                </label>
                {/* Se define el input con los atributos y se le pasa el register como referencia para que react-hook-fomr sepa que es un input del formulario */}
                <input 
                    data-ripple-light="true" data-tooltip-target="tooltip-bottom"
                    className={`rounded-md p-2 border-2 text-sm h-10 caret-primaryColor font-[500]
                    focus:outline-none transition-colors duration-500 ${isFocused ? 'border-primaryColor' : ''} ${isInvalid ? 'border-red-600' : ''}`}
                    disabled={disabled}
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    onFocus={handleFocus}
                    value={value}
                    {...register(name, 
                        { onBlur: handleBlur, 
                        onChange: (e) => {
                            event?.(e)
                            trigger(name)
                        }
                    })}
                    style={inputStyles}
                />
                {isInvalid && (
                    <div className='absolute left-0 top-16 w-full mt-0 z-40 slide-bottom '>
                        <InputError
                            message={inputError?.error?.message ?? ''}
                            key={inputError?.error?.message}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};


