'use client';
import Image from 'next/image'
import React, { useState } from "react";
import logo from '@/../public/img/logo/Logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from "@fortawesome/free-regular-svg-icons"
import { faPlus, faListCheck, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

//[ ] CONTEXT
import { useAuth } from '@/context/auth.context';

interface MenuSidebar  {
    openModal: (opNumber: number, id?: string) => void
    logout: () => void,
    linkActive: number
}

export const MenuSidebar: React.FC<MenuSidebar> = ({openModal, logout, linkActive}) => {
    
    const { payload } = useAuth(); //TODO CONTEXT

    const [itemIsHover, setItemHover] = useState([false,false,false])

    //HOVER
    const handleMouseEnter = (index: number) => {
        const newActiveState = itemIsHover.map((item, i) => (i === index ? true : item));
        setItemHover(newActiveState);
    };

    const handleMouseLeave = (index: number) => {
        const newActiveState = itemIsHover.map((item, i) => (i === index ? false : item));
        setItemHover(newActiveState);
    };
    
    return (
        <div>
            {/* [ ] NAVBAR SIDEBAR */ }
            <div className="bg-box_1-accent flex flex-col h-[86vh] relative top-[3rem]">
                <a href="profile" 
                    className={`${linkActive == 0 ? 'bg-box_1-text_primary text-box_1-accent ml-0 before:w-[6px] before:h-[100%] before:bg-box_1-text_primary' 
                        : 'text-box_1-bgSecondary ml-[1.5rem]'} 
                    flex gap-[1rem] items-center relative 
                    h-[3.7rem] transition-all duration-300 ease-in`}
                    onMouseEnter={() => handleMouseEnter(0)}
                    onMouseLeave={() => handleMouseLeave(0)}>
                    <FontAwesomeIcon icon={faUser} className={`${linkActive == 0 ?
                        'text-box_1-accent ml-dashboard-bar-spacing' : ''}
                        ${itemIsHover[0] ? 'ml-[1rem]' : ''}
                        transition-all duration-300 ease-in text-[1.6rem]`}>
                    </FontAwesomeIcon>                              
                    <h3 className='text- text-[0.87rem] font-[500]'>Perfil</h3>
                </a>
                <a href="products" 
                    className={`${linkActive == 1 ? 'bg-box_1-text_primary text-box_1-accent ml-0 before:w-[6px] before:h-[100%] before:bg-box_1-text_primary' 
                        : 'text-box_1-bgSecondary ml-[1.5rem]'}
                    flex my-[1.5rem] gap-[1rem] items-center relative 
                    h-[3.7rem] transition-all duration-300 ease-in`}
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={() => handleMouseLeave(1)}>
                    <FontAwesomeIcon icon={faListCheck} className={`${linkActive == 1 ?
                        'text-box_1-accent ml-dashboard-bar-spacing' : ''}
                        ${itemIsHover[1] ? 'ml-[1rem]' : ''}
                        transition-all duration-300 ease-in text-[1.6rem]`}>
                    </FontAwesomeIcon>  
                    <h3 className='text-[0.87rem] font-[500]'>Productos</h3>
                </a>
                { linkActive === 1 ? (
                    <div>
                        <a href="#"
                            onClick={() => openModal(0)}
                            className={`text-box_1-bgSecondary ml-[1.5rem] 
                            flex gap-[1rem] items-center relative 
                            h-[3.7rem] transition-all duration-300 ease-in hover:text-box_1-text_primary`}
                            onMouseEnter={() => handleMouseEnter(2)}
                            onMouseLeave={() => handleMouseLeave(2)}>
                            <FontAwesomeIcon
                                icon={faPlus} 
                                className={`${itemIsHover[2] ? 'ml-[1rem]' : ''}
                                transition-all duration-300 ease-in text-[1.6rem]`}>
                            </FontAwesomeIcon>                            
                            <h3 className='text-[0.87rem] font-[500]'>Agregar Producto</h3>
                        </a>
                    </div> 
                ) : (
                    <div></div>
                )}
                <div className={`${linkActive === 0 ? 'mt-[410px]' : 'mt-[350px]'} w-[60px] h-[100px] flex items-center mx-auto`}>
                    <Image
                        src={logo}
                        alt='Logo'
                        width={100}
                        height={100}
                        className='mx-auto relative rounded-[7px]'
                    />
                </div>
                <div className={`w-[100%] h-auto flex justify-between items-center p-2`}>
                    <div onClick={() => logout()} className='w-[40px] h-[40px] bg-box_1-text_primary text-box_1-primary transition-colors ease-linear duration-150
                        rounded-md p-2 cursor-pointer mx-auto hover:bg-box_1-primary hover:text-box_1-text_primary 
                        hover:border-[1px] hover:border-solid hover:border-box_1-text_primary'>
                        <FontAwesomeIcon 
                            icon={faRightFromBracket} 
                            className={`ml-[4px] mt-[2px]
                            transition-all duration-300 ease-in text-[20px] text-center`}>
                        </FontAwesomeIcon>
                    </div>
                    <p className='text-box_1-text_primary text-[17px] font-bold mr-[40px]'>{payload ? payload.username : ''}</p>
                </div>
            </div>
        </div>
    )
}