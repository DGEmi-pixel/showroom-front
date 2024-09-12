'use client';
import { useState, useEffect } from "react";
import Image from 'next/image';
import adidas from '../../public/img/adidas.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faStar as solidStar, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import adidas01 from '../../public/img/adidas01.png';
import adidas02 from '../../public/img/adidas02.png';
import adidas03 from '../../public/img/adidas03.png';
import { ProductCardProps } from "@/types/product.types";

//FUENTE PARA EL TEXTO DEL TÍTULO
import { montserrat, raleway, poppins } from '@/styles/fonts/font'

export const ProductCard: React.FC<ProductCardProps> = ({name, brand, imageUrl, sizesAvailable, price, availableColours}) => {

    // Define el tipo opcional para activeIndex
    type ActiveIndexType = number | null;

    const [productImg, setProductImg] = useState(adidas01); // Inicializa el estado con una imagen por default
    const [activeIndex, setActiveIndex] = useState<ActiveIndexType>(null);
    
    type StaticImageData = {
        src: string;
        height: number;
        width: number;
    };

    // Definir un tipo para el mapeo de identificadores de imagen
    type ImageMap = {
        [key: string]: StaticImageData;
    };

     // Crear un objeto que mapee identificadores a imágenes importadas
    const images: ImageMap = {
        adidas01,
        adidas02,
        adidas03,
    };

    // Función para cambiar la imagen basada en un identificador
    const changeProductImg = (id: keyof ImageMap) => {
        setProductImg(images[id])
    };

    // Función para cambiar el color de la ropa
    const setClothColor = (index: number, imgIndex: string) => {
        if (activeIndex === index) {
            // Si el mismo círculo se hace clic, desactívalo
            setActiveIndex(null);
        } else {
            // Desactiva cualquier otro círculo activo y activa el círculo clicado
            setActiveIndex(index);
            changeProductImg(imgIndex);
        }
    }

    /*----FILTROS----*/
    const [currentTypeValue, setTypeValue] = useState('');
    const [dropdownEnable, setDropdownEnable] = useState(false);


    //[ ] Variable q contiene el tamaño máx de la tarjeta según los talles
    const [dynamicCardHeight, setDynamicCardHeight] = useState(450);

    const changeDropdownEnable = () => {
        setDropdownEnable(!dropdownEnable)
    }

    const setClothingType = (clothingType: string) => {
        setTypeValue(clothingType);
    }

    const handleTypeChange = (type: string) => {
        setClothingType(type);
    };

    useEffect(() => {
        setDynamicCardHeight(480 + (sizesAvailable.length * 40));
    }, [sizesAvailable]);  // Dependencia al arreglo sizesAvailable

    return (
        <div style={{height: dropdownEnable ? `${dynamicCardHeight}px` : '480px'}} 
            className={`transition-all duration-300 ease-in-out bg-slate-50
            overflow-hidden ml-10 mt-10 max-w-[350px] w-[100%] shadow-xl rounded-3xl pt-5 pr-8 pb-8 pl-8`}>
            <div className="flex items-center justify-between">
                <span 
                    className={`${raleway.className}text-[#707070] text-lg mb-2 italic`}>{brand}
                </span>
                <FontAwesomeIcon icon={faShoppingBag} className={`mb-2 size-6 text-[#707070] transition-colors duration-75 cursor-pointer hover:text-[#333]`}/>
            </div>
            <div className="w-[220px] h-[220px] ml-[30px] overflow-hidden 
            bg-dashboard-color-background rounded-[10px] p-[5px] shadow-products-card-shadow_1">
                <Image
                    className="object-contain transition-opacity ease-in brightness-[1.1] grayscale-[0.2]"
                    src={imageUrl}
                    alt="product image"
                    width={220}  // Tamaño específico en pixeles
                    height={220}
                    layout="fixed" // Esto mantiene las dimensiones exactas
                />
            </div>
            <div className="mt-6">
                <span 
                    className={`${montserrat.className} ml-4 text-[18px] text-[#707070] font-medium`}>{name}
                </span>
            </div>
            <div className="mt-2">
                <span className="ml-4 text-[26px] font-semibold text-[#707070]">${price}</span>
            </div>
            <div className="flex justify-between items-center  mt-4">
                <div className="flex items-center mt-2">
                    <span className="size-[18px] font-medium color-[#333] mr-2">Color:</span>
                    <div className="flex ml-6 mt-1">
                        {availableColours.map((color, index) => (
                            <span style={{backgroundColor: color}} key={index} onClick={() => setClothColor(index, 'adidas01')} className={`circle h-[18px] w-[18px] rounded-full mx-2 my-0 cursor-pointer
                                ${activeIndex === index ? 'shadow-outline-blue' : ''}`}>
                            </span>
                        ))}
                    </div>
                </div>

                <div onClick={changeDropdownEnable} className={`relative w-[100px] h-[40px]`}>
                    <FontAwesomeIcon icon={faChevronDown} className="absolute top-[25%] right-[20px] text-box_1-text_primary cursor-pointer z-[100]"/>
                    <input type="text" className="absolute top-0 right-0 w-[100%] h-[100%] cursor-pointer bg-white border-none 
                    outline-none shadow-lg rounded-[10px] px-4" 
                    placeholder="Talle" value={currentTypeValue} readOnly/>
                    <div className={`${dropdownEnable ? 'block' 
                                                        : 'hidden'} 
                            bg-white absolute top-[50px] w-[100px] right-0 shadow-xl rounded-[10px] overflow-hidden z-[1000]`}>
                        
                        {sizesAvailable.map(size => (
                                <div key={size} onClick={() => handleTypeChange(size.toString())} className="py-[10px] px-[10px] text-center cursor-pointer hover:bg-box_1-text_primary hover:text-white">
                                    {size}
                                </div>
                            ))}
                    </div>
                </div>
                
            </div>
        </div>
    )
}