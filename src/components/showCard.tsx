'use client';
import { useState } from "react";
import Image from 'next/image';
import adidas from '../../public/img/adidas.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faStar} from "@fortawesome/free-solid-svg-icons";
import adidas01 from '../../public/img/adidas01.png';
import adidas02 from '../../public/img/adidas02.png';
import adidas03 from '../../public/img/adidas03.png';
import { ShowCardProps } from "@/types/product.types"

//[ ] HOOKS
import { useOfferCalc } from "@/hooks/discount.hook";

export const ShowCard: React.FC<ShowCardProps> = ({name, description, discount, price}) => {

    const [productImg, setProductImg] = useState(adidas01); // Inicializa el estado con una imagen por default

    return (
        <div className="scale-in-bottom relative overflow-hidden ml-10 max-w-[355px] h-[500px] w-[100%] 
                shadow-xl rounded-3xl pt-5 pr-8 pb-8 pl-8">
            <div className="relative flex items-center justify-between">
                <Image src={adidas} alt="Adidas" width={60} height={60} 
                className="object-cover h-[60px] w-[60px]"></Image>
                {/*[ ] Si el producto está en oferta */}
                <span className="absolute inline-block h-[100px] w-[100px] overflow-hidden -top-[30px] -right-[40px]">
                    <span className="absolute rotate-45 z-20 right-0 top-0 text-box_1-secondary font-bold text-3xl flex items-center justify-center w-full h-full">
                        {discount}%
                    </span>
                    <div className="absolute w-[150%] h-[45px] bg-netflixPrimary rounded-lg rotate-45 -translate-x-1/2 -translate-y-1/2 top-1/2 left-[50%] shadow-[0_5px_10px_rgba(20,20,20,0.3)]"></div>
                </span>
            </div>
            
            <div className="relative h-[210px]">
                <Image 
                    className="object-cover rotate-[35deg] absolute left-12 top-[-40px] transition-opacity ease-in"
                    src={productImg}
                    alt="product image"
                    width={250}  // Tamaño específico en pixeles
                    height={250}
                    layout="fixed" // Esto mantiene las dimensiones exactas
                />
            </div>
            <div>
                <span className="size-6 font-medium">{name}</span>
                <p className="text-sm font-normal text-[#333] text-justify">
                    {description}
                </p>
            </div>
            <div className="mt-4">
                <div  className="relative mt-2 flex items-center justify-between">
                    <div className="flex items-center mt-[17px]">
                        <FontAwesomeIcon icon={faStar} fontSize={18} className="text-box_1-text_primary"/>
                        <FontAwesomeIcon icon={faStar} fontSize={18} className="text-box_1-text_primary"/>
                        <FontAwesomeIcon icon={faStar} fontSize={18} className="text-box_1-text_primary"/>
                        <FontAwesomeIcon icon={faStar} fontSize={18} className="text-box_1-text_primary"/>
                        <FontAwesomeIcon icon={faStar} fontSize={18} className="text-box_1-text_primary"/>
                    </div>
                    <del className="absolute top-0 right-0 font-medium">${price}</del>
                    <span className="mt-[17px] text-[26px] font-semibold text-[#707070]">${useOfferCalc(price, discount)}</span>
                </div>
            </div>
            <div className="mt-2 flex justify-between items-center">
                <div className="flex items-center mt-2">
                    <span className="size-[18px] font-medium color-[#333] mr-2">Color:</span>
                    <div className="flex ml-6 mt-1">
                        <span className={`circle h-[18px] w-[18px] bg-box_1-text_primary rounded-full mx-2 my-0 cursor-pointer`}>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}