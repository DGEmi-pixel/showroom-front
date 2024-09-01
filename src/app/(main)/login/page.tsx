"use client";
import "@/styles/colors.css";
import { LoginForm } from "@/components/loginForm";
import { poppins, lora } from "@/styles/fonts/font";

import { useState } from "react";

//[ ] NOTIFICACIÓN
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

//[ ] COMPONENTES
import { Spinner } from "@/components/spinner";

export default function Home() {

    const [loadingSpinner, setLoadingSpinner] = useState<boolean>(false);

return (
    <main className="relative w-screen h-screen py-10 flex flex-col items-center bg-gradient-to-r from-[#f1f2f6] to-[#ced6e0]">
        <div className="absolute z-[1] top-[40px] left-[47%] w-[120px] h-[80px] bg-gray-100 rounded-b-3xl shadow-lg shadow-gray-300">
        </div>
        <div className="relative bg-white mx-auto flex flex-col w-[200px] md:w-1/2 h-full items-center rounded-lg shadow-lg shadow-gray-400">
            <h2 className={` ${poppins.className} z-[2] mt-[20px] text-violet-800 font-extralight text-[30px]`}>
                M<span className={` text-violet-400`}>N</span>
            </h2>
            <span className={`${lora.className} mt-[50px] text-[20px]`}>&ldquo; Un negocio en familia&rdquo; </span>
            <div className="flex flex-col w-96 h-3/4 justify-center items-center">
                <h1 className="w-3/4 font-[500] text-3xl">Iniciar Sesión</h1>
                <p className="w-3/4 font-[500] text-xs text-gray-500 py-2">Bienvenido nuevamente! Ingrese sus credenciales.</p>
                <LoginForm setLoadingSpinner={setLoadingSpinner} />
            </div>

            { loadingSpinner && <Spinner top="45%" left="45%" /> }
        </div>

        <ToastContainer 
            autoClose={2500}
            icon={false}
            position={"bottom-center"}
        />
    </main>
)
}
