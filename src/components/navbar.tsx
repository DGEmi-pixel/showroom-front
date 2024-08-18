import React, { useRef, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/../public/img/logo/Logo.jpg';

// Define the prop types
interface NavbarProps {
    sectionContact: boolean;
    onNavLinkClick?: (section: string) => void;
    elements: {linkName: string, href: string, out?: React.RefObject<HTMLDivElement>}[];
}

export const Navbar: React.FC<NavbarProps> = ({ sectionContact, onNavLinkClick, elements }) => {

    // Se inicializa los estados de los links en false
    const [linkActive, setLinkActive] = useState(() => elements.map(() => false));

    const toggleLink = (index: number) => {
        setLinkActive(linkActive.map((_, i) => i === index));
    }

    //[ ] Navigation
    const scrollToSection = (hash: string, linkIndex: number, ref?: React.RefObject<HTMLDivElement>) => {
        if(ref?.current) {
            // Si estamos en la misma página y el ref está disponible, desplazarse a la sección
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
        else if (onNavLinkClick) {
            onNavLinkClick(hash);
        }
        //toggleLink
        toggleLink(linkIndex);
    }
    
    return (
        <header className="bg-box_1-primary fixed top-0 left-0 z-[100] w-[100%] flex justify-between items-center">
            <a href="#">
                <Image
                    alt='Dashboard Logo'
                    src={logo}
                    width={100} 
                    height={100}
                    className='ml-12 mt-1 relative max-w-20 rounded-[16px]'>
                </Image>
            </a>
            <ul className="mr-16 relative flex text-[15px]">
                {
                    elements?.map((e, index) => (
                        <li key={e.linkName} onClick={() => scrollToSection(`${e.href}`, index, e.out)} 
                            className="list-none cursor-pointer">
                            {
                                e.linkName === 'Productos' 
                                ? 
                                    <a href={e.href}
                                        className={` 
                                        text-silver-electroMagnetic inline-block font-bold ml-10`}>
                                        {e.linkName}
                                    </a> 
                                :
                                    <a className={` 
                                        text-silver-electroMagnetic inline-block font-bold ml-10`}>
                                        {e.linkName}
                                    </a>
                            }
                        </li>
                    ))}
            </ul>
        </header>
    )
}