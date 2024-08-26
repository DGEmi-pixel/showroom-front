import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/schemas/form.schema';
import { InputWithLabel } from "./input"
import { LoginFormValues } from '@/types/form.types';
import { inputConfig } from '@/helpers/inputConfig.helpers';

//[ ] NOTIFICACION
import { toast } from 'react-toastify';

//[ ] HOOKS
import { useAuthHook } from "@/hooks/auth.hook";


export const LoginForm: React.FC<({setLoadingSpinner: (loading: boolean) => void})> = ({setLoadingSpinner}) => {

    const { auth } = useAuthHook();

    const [showPassword, setShowPassword] = useState(false)
    const methods = useForm<LoginFormValues>({ resolver: yupResolver(loginSchema) })

    const handleLogin = methods.handleSubmit(async data => {
        setLoadingSpinner(true)
        try {
            const { username, password } = data
            const loginData = {username, password}
            const resServ = await auth(loginData)
            
            if(typeof resServ === 'string'){
                const redirectUrl = 'https://showroom-front-2.onrender.com/dashboard/profile';
                window.location.href = redirectUrl
            } else if(resServ.statusCode === 404) {
                toast.error(resServ.message)
            } else {
                toast.error('Login failed')
            }

            methods.reset()
        } catch (error) {
            toast.error('An error occurred during login');
            console.log(error)
        } finally {
            setLoadingSpinner(false) //Luego de la poetición ocultar el spinner
        }
    })

    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = () => {
        setChecked(!checked);
    };

    return (
        // Se utiliza FormProvider para pasar los métodos de react-hook-form a los componentes hijos
        <FormProvider {...methods}>
            <form
                className='w-full'
                onSubmit={e => e.preventDefault()}
                noValidate
                autoComplete="off"
            >
                {/* Se utiliza el componente InputWithLabel, se le pasa el objeto inputConfig y se le indica el tipo de input */}
                <div className="flex flex-col mx-auto w-3/4 py-2">
                    <InputWithLabel {...inputConfig.username} />
                    <div className="relative">
                        {/* En password, aparte de pasar el objeto inputConfig se le indica el tipo de input para cambiarlo a texto dependiendo del estado de showPassword */}
                        <InputWithLabel {...inputConfig.password} type={showPassword === false ? "password" : "text"} />
                        <FontAwesomeIcon
                            icon={showPassword === false ? faEye : faEyeSlash}
                            className="absolute w-4 top-12 right-4 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>
                </div>
                <div className="flex w-3/4 mx-auto justify-between items-center text-[14px]">
                    <div className="py-2 flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            id="checkbox" 
                            className="appearance-none border-[1px] border-solid border-gray-400 w-[18px] h-[18px] rounded cursor-pointer
                                checked:bg-blue-500 checked:border-blue-500 focus:outline-none" 
                            onChange={handleCheckboxChange}
                        />
                        <span className="flex items-center justify-center w-[18px] h-[18px] ml-[-18px] pointer-events-none">
                            {checked && (
                                <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 20 20">
                                    <path d="M7.629 13.772l-3.532-3.532a1 1 0 0 1 1.414-1.414l2.118 2.118 5.586-5.586a1 1 0 1 1 1.414 1.414L8.57 13.772a1 1 0 0 1-1.414 0z"/>
                                </svg>
                            )}
                        </span>
                        <label htmlFor="checkbox" className="font-[500] text-slate-800 ml-2">Remember me</label>
                    </div>
                    <Link href="#" 
                        className="font-[500] text-box_1-bgSecondary transition-colors hover:text-box_1-text_primary">Forgot password?</Link>
                </div>
                <div className="flex flex-col mx-auto w-3/4 gap-2 py-4">
                    <button className="flex h-10 font-[500] text-sm text-cyan-50 bg-box_1-text_primary hover:bg-box_1-primary hover:text-box_1-text_primary 
                    hover:border-box_1-text_primary border-[1px] border-solid transition-colors justify-center items-center rounded-md p-2 mb-2 mt-2" onClick={handleLogin}>
                        Iniciar sesión
                    </button>
                    <button className="relative flex h-10 font-[500] text-sm text-black bg-white hover:bg-box_1-secondary transition-colors justify-center items-center rounded-md p-2 border-2 ">
                        <FontAwesomeIcon icon={faGoogle} className="w-4 mr-1" size="lg" /> Sign in with Google
                    </button>
                </div>
            </form>
        </FormProvider>
    )
}