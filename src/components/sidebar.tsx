'use client';
import Image from 'next/image'
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCircleChevronRight, faChevronDown, faUserTie, faXmark, faShirt, faChampagneGlasses, faSnowflake, faCloudSun, faSeedling,
    faStarAndCrescent, faWallet, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faCanadianMapleLeaf } from '@fortawesome/free-brands-svg-icons';
import { Filter, TypeOfSeason } from "@/types/product.types";
import { FilterProps } from "@/types/product.types";
import { Season, TypeOfClothing, SizeAbb } from "@/types/product.types";
import { useCallback } from "react";
import brandLogo from '../../public/img/logo/Logo.jpg'

//[ ] TIPOS
import { Product, seasonTranslations } from '@/types/product.types';
import { BrandCount } from '@/types/brandCount.types';

interface Sidebar {
    products: Product[],
    brandCount: BrandCount,
    isOpen: boolean,
    logo?: boolean,
    toggleSidebar?: () => void,
    onFilterApply: (filters: any) => void
}

export const Sidebar: React.FC<Sidebar> = ({brandCount, products, isOpen, toggleSidebar, onFilterApply, logo}) => {

    const [currentTypeValue, setTypeValue] = useState<string>('');
    const [dropdownEnable, setDropdownEnable] = useState(false);
    const [filters, setFilters] = useState<Filter>({});
    const [priceRange, setPriceRange] = useState<{ min?: string; max?: string }>({ min: '', max: '' });
    const [activeBrand, setBrandActive] = useState<string | null>(null);

    const [currentSeasonValue, setSeasonValue] = useState<TypeOfSeason>("Todos");
    const [seasonDropdownEnable, setSeasonDropdownEnable] = useState(false);

    //[ ] VALORES ÚNICOS DEL TALLE (sin repetir)
    const nSizes = [...new Set(products.flatMap(item => item.size))].sort()
    const [activesClothingSize, setActivesClotghingSize] = useState(() => nSizes.map(() => false));

    const setClothingSize = (index: number) => {
        setActivesClotghingSize(prevState => {
            const updatedState = [...prevState];
            updatedState[index] = !prevState[index];
            return updatedState;
        });
    };

    const setClothingType = (clothingType: string) => {
        setTypeValue(clothingType);
    };

    const changeDropdownEnable = () => {
        setDropdownEnable(!dropdownEnable)
    }
    
    const handleTypeChange = (type: TypeOfClothing) => {
        if (type !== 'Todos') {
            setFilters(prev => ({ ...prev, type }));
        } else {
            setFilters(prev => ({ ...prev, type: undefined }));
        }
        setClothingType(type);
    };

    const handleSizeChange = (size: number, index: number) => {
        setFilters(prev => ({
            ...prev,
            size: prev.size?.includes(size) 
            ? prev.size.filter(s => s !== size) 
            : [...(prev.size || []), size]
        }));
        setClothingSize(index);
    };

    const handleBrandChange = (brandObject: { brand: string }) => {
        const { brand } = brandObject;

        setFilters(prev => ({
            ...prev,
            brand: prev.brand?.includes(brand) ? undefined : brand
        }));
        activeBrand !== brand ? setBrandActive(brand) : setBrandActive(null);
    };

    const changeSeasonDropdownEnable = () => {
        setSeasonDropdownEnable(!seasonDropdownEnable)
    };

    const handleSeasonTypeChange = (season: TypeOfSeason) => {
        if(season !== 'Todos') {
            setFilters(prev => ({...prev, season }))
        } else {
            setFilters(prev => ({...prev, season: undefined }))
        }
        setSeason(season);
    };

    const setSeason = (season: TypeOfSeason) => {
        setSeasonValue(season)
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPriceRange(prevRange => ({
            ...prevRange,
            [name]: value
        }));
    };

    const updatePriceRangeFilters = () => {
        const min = Number(priceRange.min);
        const max = Number(priceRange.max);
        setFilters(prev => ({
            ...prev,
            priceRange: { min, max }
        }));
    };

    const handleApplyFilters = useCallback(() => {
        onFilterApply(filters);  // Pasa los filtros al hook
    }, [filters, onFilterApply]);

    useEffect(() => {
        handleApplyFilters();
    }, [filters, isOpen]);
    return (
        <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} transform z-[100] transition-transform duration-300 ease-in-out
        fixed bg-box_1-accent h-[100vh] flex flex-col`}>
            <div className="w-[14rem] flex items-center justify-between mt-[1.4rem]">
                <div className="logo flex flex-col gap-[0.8rem]">
                    <div className='block w-[100%] ml-9'>
                        {
                            logo
                                ? 
                            <Image
                                alt='Dashboard Logo'
                                src={brandLogo}
                                width={100} 
                                height={100}
                                className='mx-auto relative max-w-20 rounded-[16px]'>
                            </Image>
                                : null
                        }
                    </div>
                    <h2 className='text-box_1-bgSecondary text-[1.4rem] ml-16'>M&<span className='text-box_1-text_primary'>M</span></h2>
                </div>
                <div className='close-btn hidden'>
                    <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                </div>
            </div>

            <div className="bg-box_1-accent flex flex-col h-[86vh] relative top-[3rem]">
                {/*
                    ----TÍTULO-----
                */}
                <div className="flex justify-between items-center pt-4 pb-4">
                    <h3 className="ml-4 text-xl text-box_1-text_primary font-medium">Filtros</h3>
                </div>

                <span className="block ml-4 mt-5 text-base font-medium text-box_1-bgSecondary">Tipo de Indumentaria</span>
                <div onClick={changeDropdownEnable} className="ml-4 mt-4 relative w-[180px] h-[40px]">
                    <FontAwesomeIcon icon={faChevronDown} className="absolute top-[25%] right-[20px] cursor-pointer z-[100] text-box_1-text_primary"/>
                    <input type="text" className="absolute top-0 left-0 w-[100%] h-[100%] cursor-pointer bg-white border-none 
                        outline-none shadow-lg py-[5px] px-[20px] rounded-[10px]" 
                        placeholder="Menu" value={currentTypeValue} readOnly/>
                    <div className={`${dropdownEnable ? 'block' 
                                                        : 'hidden'} 
                            absolute top-[70px] w-[100%] bg-white shadow-xl rounded-[10px] overflow-hidden z-[1000]`}>
                        <div onClick={() => handleTypeChange('Todos')} className="py-[12px] px-[10px] cursor-pointer hover:bg-box_1-text_primary hover:text-box_1-primary">
                            <FontAwesomeIcon icon={faGlobe} className="relative top-[4px] px-4 text-[1.2em]"/>
                            Todos
                        </div>
                        <div onClick={() => handleTypeChange('Formal')} className="py-[12px] px-[10px] cursor-pointer hover:bg-box_1-text_primary hover:text-box_1-primary">
                            <FontAwesomeIcon icon={faUserTie} className="relative top-[4px] px-4 text-[1.2em]"/>
                            Formal
                        </div>
                        <div onClick={() => handleTypeChange('Casual')} className="py-[12px] px-[10px] cursor-pointer hover:bg-box_1-text_primary hover:text-box_1-primary">
                            <FontAwesomeIcon icon={faShirt} className="relative top-[4px] px-4 text-[1.2em]"/>
                            Casual
                        </div>
                        <div onClick={() => handleTypeChange('Fiestas')} className="py-[12px] px-[10px] cursor-pointer hover:bg-box_1-text_primary hover:text-box_1-primary">
                            <FontAwesomeIcon icon={faChampagneGlasses} className="relative top-[4px] px-4 text-[1.2em]"/>
                            Fiestas
                        </div>
                        <div onClick={() => handleTypeChange('Pijamas')} className="py-[12px] px-[10px] cursor-pointer hover:bg-box_1-text_primary hover:text-box_1-primary">
                            <FontAwesomeIcon icon={faStarAndCrescent} className="relative top-[4px] px-4 text-[1.2em]"/>
                            Para dormir
                        </div>
                        <div onClick={() => handleTypeChange('Accesorios')} className="py-[12px] px-[10px] cursor-pointer hover:bg-box_1-text_primary hover:text-box_1-primary">
                            <FontAwesomeIcon icon={faWallet} className="relative top-[4px] px-4 text-[1.2em]"/>
                            Accesorios
                        </div>
                    </div>
                </div>

                <span className="block ml-4 mt-10 text-base font-medium text-box_1-bgSecondary">De Temporada</span>
                <div onClick={changeSeasonDropdownEnable} className="ml-4 mt-4 relative w-[180px] h-[40px]">
                    <FontAwesomeIcon icon={faChevronDown} className="absolute top-[25%] right-[20px] cursor-pointer z-[100] text-box_1-text_primary"/>
                    <input type="text" className="absolute top-0 left-0 w-[100%] h-[100%] cursor-pointer bg-box_1-primary border-none 
                        outline-none shadow-lg py-[5px] px-[20px] rounded-[10px]" 
                        placeholder="Menu" value={currentSeasonValue === 'Todos' ? 'Todos' : seasonTranslations[currentSeasonValue]} readOnly/>
                    <div className={`${seasonDropdownEnable ? 'block' 
                                                        : 'hidden'}
                            absolute top-[70px] w-[100%] bg-box_1-primary shadow-xl rounded-[10px] overflow-hidden z-[1000]`}>
                        <div onClick={() => handleSeasonTypeChange('Todos')} className="py-[12px] px-[10px] cursor-pointer hover:bg-box_1-text_primary hover:text-box_1-primary">
                            <FontAwesomeIcon icon={faGlobe} className="relative top-[4px] px-4 text-[1.2em]"/>
                            Todos
                        </div>
                        <div onClick={() => handleSeasonTypeChange('Autumn')} className="py-[12px] px-[10px] cursor-pointer hover:bg-box_1-text_primary hover:text-box_1-primary">
                            <FontAwesomeIcon icon={faCanadianMapleLeaf} className="relative top-[4px] px-4 text-[1.2em]"/>
                            Otoño
                        </div>
                        <div onClick={() => handleSeasonTypeChange('Spring')} className="py-[12px] px-[10px] cursor-pointer hover:bg-box_1-text_primary hover:text-box_1-primary">
                            <FontAwesomeIcon icon={faSeedling} className="relative top-[4px] px-4 text-[1.2em]"/>
                            Primavera
                        </div>
                        <div onClick={() => handleSeasonTypeChange('Summer')} className="py-[12px] px-[10px] cursor-pointer hover:bg-box_1-text_primary hover:text-box_1-primary">
                            <FontAwesomeIcon icon={faCloudSun} className="relative top-[4px] px-4 text-[1.2em]"/>
                            Verano
                        </div>
                        <div onClick={() => handleSeasonTypeChange('Winter')} className="py-[12px] px-[10px] cursor-pointer hover:bg-box_1-text_primary hover:text-box_1-primary">
                            <FontAwesomeIcon icon={faSnowflake} className="relative top-[4px] px-4 text-[1.2em]"/>
                            Invierno
                        </div>
                    </div>
                </div>
                
                <span className="block ml-4 mt-10 text-base font-medium text-box_1-bgSecondary">Talle</span>
                <div className="max-w-[200px] h-max mt-4 flex items-center justify-around flex-wrap">
                    {
                        nSizes.map((e, i) => (
                            <span key={i} onClick={() => handleSizeChange(e, i)} 
                                className={`${activesClothingSize[i] ? 'bg-box_1-text_primary text-white' : 'bg-box_1-accent text-box_1-text_primary'} 
                                h-[24px] w-[25px] ml-2 mt-2 rounded-sm shadow-md cursor-pointer text-center font-bold`}>{e}
                            </span>
                        ))
                    }
                </div>

                <span className="block ml-4 mt-10 text-base font-medium text-box_1-bgSecondary">Precio</span>
                <div className="relative ml-4 mt-4 flex flex-col justify-around">
                    <input 
                            name="min"
                            onChange={(e) => handlePriceChange(e)} 
                            value={priceRange.min} 
                            type="number" 
                            className="text-[14px] w-[180px] h-[35px] p-2 shadow-lg bg-white
                        rounded-[4px] focus:outline-box_1-text_primary" placeholder="Mínimo"/>
                    <input
                        name="max"
                        onChange={handlePriceChange} 
                        value={priceRange.max} 
                        type="number" 
                        className="text-[14px] w-[180px] h-[35px] mt-4 p-2 shadow-lg bg-white
                        rounded-[4px] focus:outline-box_1-text_primary" 
                        placeholder="Máximo"/>
                    <FontAwesomeIcon 
                        onClick={updatePriceRangeFilters} 
                        icon={faCircleChevronRight} 
                        className="absolute top-[30px] left-[80%] text-[24px] cursor-pointer z-[100]
                        text-box_1-text_primary"/>
                </div>

                <span className="block ml-4 mt-10 text-base font-medium text-box_1-bgSecondary">Marca</span>
                <div className="ml-4 mt-4 flex flex-col">
                    {Object.entries(brandCount).map(([brand, count]) => (
                        <p
                            key={brand}
                            onClick={() => handleBrandChange({brand})} 
                            className={`${activeBrand === brand ? 'text-box_1-text_primary font-semibold' : ''} text-sm cursor-pointer`}>{brand} 
                            <span className={`${activeBrand === brand ? 'text-box_1-text_primary font-semibold' : 'text-box_1-text_primary'}`}> ({count})</span>
                        </p>
                    ))}
                </div>
            </div> 
        </aside>
    )
}