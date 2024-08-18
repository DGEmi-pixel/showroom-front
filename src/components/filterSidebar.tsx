'use client';

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCircleChevronRight, faChevronDown, faUserTie, faShirt, faChampagneGlasses, 
    faStarAndCrescent, faWallet, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { Filter } from "@/types/product.types";
import { FilterProps } from "@/types/product.types";
import { Season, TypeOfClothing, SizeAbb } from "@/types/product.types";
import { useCallback } from "react";


export const Filters: React.FC<FilterProps> = ({brandCount, onFilterApply}) => {

    const [isActive, setActive] = useState(true);
    const [activesClothingSize, setActivesClotghingSize] = useState([false, false, false]);
    const [currentTypeValue, setTypeValue] = useState<string>('');
    const [dropdownEnable, setDropdownEnable] = useState(false);
    const [filters, setFilters] = useState<Filter>({});
    const [priceRange, setPriceRange] = useState<{ min?: string; max?: string }>({ min: '', max: '' });
    const [activeBrand, setBrandActive] = useState<string | null>(null);

    const showSidebar = () => {
        setActive(!isActive);
    };

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

    const handleSizeChange = (textSize: SizeAbb, element: number) => {
        setFilters(prev => ({
            ...prev,
            textSize: prev.textSize?.includes(textSize) ? prev.textSize.filter(s => s !== textSize) : [...(prev.textSize || []), textSize]
        }));
        setClothingSize(element);
    };

    const handleBrandChange = (brandObject: { brand: string }) => {
        const { brand } = brandObject;

        setFilters(prev => ({
            ...prev,
            brand: prev.brand?.includes(brand) ? undefined : brand
        }));
        activeBrand !== brand ? setBrandActive(brand) : setBrandActive(null);
    };

    const handleSeasonChange = (season: Season) => {
        setFilters(prev => ({
            ...prev,
            season: prev.season?.includes(season) ? prev.season.filter(s => s !== season) : [...(prev.season || []), season]
        }));
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
    }, [filters]);
    return (
        <div className="fixed left-0 top-[140px] w-[12%] h-[90vh] bg-slate-200 rounded-tr-md">
            {/*
                ----TÍTULO-----
            */}
            <div className="flex justify-between items-center pt-4 pb-4">
                <h3 className="ml-4 text-xl text-[#0071c7] font-medium">Filtros</h3>
                <FontAwesomeIcon onClick={() => showSidebar()} icon={faChevronRight} 
                className={`mr-4 text-[#0071c7] text-[24px] cursor-pointer transition-all duration-300 ${isActive ? 'rotate-180' : ''}`}/>
            </div>

            <span className="block ml-4 mt-5 text-base font-medium text-[#333]">Tipo de Indumentaria</span>
            <div onClick={changeDropdownEnable} className="ml-4 mt-4 relative w-[180px] h-[40px]">
                <FontAwesomeIcon icon={faChevronDown} className="absolute top-[25%] right-[20px] cursor-pointer z-[100]"/>
                <input type="text" className="absolute top-0 left-0 w-[100%] h-[100%] cursor-pointer bg-white border-none 
                    outline-none shadow-lg py-[5px] px-[20px] rounded-[10px]" 
                    placeholder="Menu" value={currentTypeValue} readOnly/>
                <div className={`${dropdownEnable ? 'block' 
                                                    : 'hidden'} 
                        absolute top-[70px] w-[100%] bg-white shadow-xl rounded-[10px] overflow-hidden z-[1000]`}>
                    <div onClick={() => handleTypeChange('Todos')} className="py-[12px] px-[10px] cursor-pointer hover:bg-[#62baea] hover:text-white">
                        <FontAwesomeIcon icon={faGlobe} className="relative top-[4px] px-4 text-[1.2em]"/>
                        Todos
                    </div>
                    <div onClick={() => handleTypeChange('Formal')} className="py-[12px] px-[10px] cursor-pointer hover:bg-[#62baea] hover:text-white">
                        <FontAwesomeIcon icon={faUserTie} className="relative top-[4px] px-4 text-[1.2em]"/>
                        Formal
                    </div>
                    <div onClick={() => handleTypeChange('Casual')} className="py-[12px] px-[10px] cursor-pointer hover:bg-[#62baea] hover:text-white">
                        <FontAwesomeIcon icon={faShirt} className="relative top-[4px] px-4 text-[1.2em]"/>
                        Casual
                    </div>
                    <div onClick={() => handleTypeChange('Fiestas')} className="py-[12px] px-[10px] cursor-pointer hover:bg-[#62baea] hover:text-white">
                        <FontAwesomeIcon icon={faChampagneGlasses} className="relative top-[4px] px-4 text-[1.2em]"/>
                        Fiestas
                    </div>
                    <div onClick={() => handleTypeChange('Pijamas')} className="py-[12px] px-[10px] cursor-pointer hover:bg-[#62baea] hover:text-white">
                        <FontAwesomeIcon icon={faStarAndCrescent} className="relative top-[4px] px-4 text-[1.2em]"/>
                        Para dormir
                    </div>
                    <div onClick={() => handleTypeChange('Accesorios')} className="py-[12px] px-[10px] cursor-pointer hover:bg-[#62baea] hover:text-white">
                        <FontAwesomeIcon icon={faWallet} className="relative top-[4px] px-4 text-[1.2em]"/>
                        Accesorios
                    </div>
                </div>
            </div>
            
            <span className="block ml-4 mt-10 text-base font-medium text-[#333]">Talle</span>
            <div className="ml-1 mt-4 flex items-center justify-around flex-wrap">
                <span onClick={() => handleSizeChange('S', 0)} className={`h-[20px] w-[40px] shadow-md text-white rounded-md mx-2 my-1 cursor-pointer text-center
                    ${activesClothingSize[0] ? 'bg-slate-800' : 'bg-slate-400'}`}>S</span>
                <span onClick={() => handleSizeChange('M',1)} className={`h-[20px] w-[40px] shadow-md text-white bg-slate-400 rounded-md mx-2 my-1 cursor-pointer text-center
                ${activesClothingSize[1] ? 'bg-slate-800' : 'bg-slate-400'}`}>M</span>
                <span onClick={() => handleSizeChange('L', 2)} className={`h-[20px] w-[40px] shadow-md text-white bg-slate-400 rounded-md mx-2 my-1 cursor-pointer text-center
                ${activesClothingSize[2] ? 'bg-slate-800' : 'bg-slate-400'}`}>L</span>
                {/* <span onClick={() => setClothingSize(3)} className={`h-[20px] w-[40px] shadow-md text-white bg-slate-400 rounded-md mx-2 my-1 cursor-pointer text-center
                ${activesClothingSize[3] ? 'bg-slate-800' : 'bg-slate-400'}`}>XL</span>
                <span onClick={() => setClothingSize(4)} className={`h-[20px] w-[40px] shadow-md text-white bg-slate-400 rounded-md mx-2 my-1 cursor-pointer text-center
                ${activesClothingSize[4] ? 'bg-slate-800' : 'bg-slate-400'}`}>XXL</span>
                <span onClick={() => setClothingSize(5)} className={`h-[20px] w-[40px] shadow-md text-white bg-slate-400 rounded-md mx-2 my-1 cursor-pointer text-center
                ${activesClothingSize[5] ? 'bg-slate-800' : 'bg-slate-400'}`}>3XL</span>
                <span onClick={() => setClothingSize(6)} className={`h-[20px] w-[40px] shadow-md text-white bg-slate-400 rounded-md mx-2 my-1 cursor-pointer text-center
                ${activesClothingSize[6] ? 'bg-slate-800' : 'bg-slate-400'}`}>X1</span>
                <span onClick={() => setClothingSize(7)} className={`h-[20px] w-[40px] shadow-md text-white bg-slate-400 rounded-md mx-2 my-1 cursor-pointer text-center
                ${activesClothingSize[7] ? 'bg-slate-800' : 'bg-slate-400'}`}>X2</span>
                <span onClick={() => setClothingSize(8)} className={`h-[20px] w-[40px] shadow-md text-white bg-slate-400 rounded-md mx-2 my-1 cursor-pointer text-center
                ${activesClothingSize[8] ? 'bg-slate-800' : 'bg-slate-400'}`}>X3</span> */}
                {/* <span className={`h-[20px] w-[40px] shadow-md text-white bg-slate-400 rounded-md mx-2 my-1 cursor-pointer text-center`}>XXL</span>
                <span className={`h-[20px] w-[40px] shadow-md text-white bg-slate-400 rounded-md mx-2 my-1 cursor-pointer text-center`}>3XL</span>
                <span className={`h-[20px] w-[40px] shadow-md text-white bg-slate-400 rounded-md mx-2 my-1 cursor-pointer text-center`}>X1</span>
                <span className={`h-[20px] w-[40px] shadow-md text-white bg-slate-400 rounded-md mx-2 my-1 cursor-pointer text-center`}>X2</span>
                <span className={`h-[20px] w-[40px] shadow-md text-white bg-slate-400 rounded-md mx-2 my-1 cursor-pointer text-center`}>X3</span> */}
            </div>

            <span className="block ml-4 mt-10 text-base font-medium text-[#333]">Precio</span>
            <div className="relative  pb-7 ml-2 mt-4 flex items-center justify-around">
                <input 
                        name="min"
                        onChange={(e) => handlePriceChange(e)} 
                        value={priceRange.min} 
                        type="number" 
                        className="text-[14px] w-[80px] h-[25px] p-2 shadow-lg bg-white
                    rounded-[4px] focus:outline-[#0071c7]" placeholder="Mínimo"/> -
                <input
                    name="max"
                    onChange={handlePriceChange} 
                    value={priceRange.max} 
                    type="number" 
                    className="text-[14px] w-[80px] h-[25px] p-2 shadow-lg bg-white
                    rounded-[4px] focus:outline-[#0071c7] " 
                    placeholder="Máximo"/>
                <FontAwesomeIcon 
                    onClick={updatePriceRangeFilters} 
                    icon={faCircleChevronRight} 
                    className="absolute top-[30px] left-[45%] text-[24px] cursor-pointer z-[100]
                    text-sea-clearHill"/>
            </div>

            <span className="block ml-4 mt-10 text-base font-medium text-[#333]">Marca</span>
            <div className="ml-4 mt-4 flex flex-col">
                {Object.entries(brandCount).map(([brand, count]) => (
                    <p
                        key={brand}
                        onClick={() => handleBrandChange({brand})} 
                        className={`${activeBrand === brand ? 'text-sea-clearHill font-semibold' : ''} text-sm cursor-pointer`}>{brand} 
                        <span className={`${activeBrand === brand ? 'text-sea-clearHill font-semibold' : 'text-gray-400'}`}> ({count})</span>
                    </p>
                ))}
            </div>
            
            <span className="block ml-4 mt-10 text-base font-medium text-[#333]">De Temporada</span>
            <div className="ml-4 mr-4 mt-4 relative flex flex-col flex-wrap">
                <div className="w-[200px] h-[30px] flex items-center justify-between">
                    <label htmlFor="#">Verano</label>
                    <input onClick={() => handleSeasonChange('Summer')} type="checkbox" className="relative cursor-pointer bg-white w-[20px] h-[18px] border-[2px] 
                        border-sea-clearHill rounded-[5px] py-2 mr-[20px] border-solid checked:bg-sea-clearHill checked:after:content-['✓']
                        after:text-[#fff] after:absolute after:top-[50%] after:left-[50%] after:-translate-x-[50%] after:-translate-y-[50%]
                        "/>
                </div>
                <div className="w-[200px] h-[30px] flex items-center justify-between">
                    <label className="" htmlFor="#">Invierno</label>
                    <input onClick={() => handleSeasonChange('Winter')} type="checkbox" className="relative cursor-pointer bg-white w-[20px] h-[18px] border-[2px] 
                        border-sea-clearHill rounded-[5px] py-2 mr-[20px] border-solid checked:bg-sea-clearHill checked:after:content-['✓']
                        after:text-[#fff] after:absolute after:top-[50%] after:left-[50%] after:-translate-x-[50%] after:-translate-y-[50%]
                        "/>
                </div>
                <div className="w-[200px] h-[30px] flex items-center justify-between">
                    <label htmlFor="#">Otoño</label>
                    <input onClick={() => handleSeasonChange('Autumn')} type="checkbox" className="relative cursor-pointer bg-white w-[20px] h-[18px] border-[2px] 
                        border-sea-clearHill rounded-[5px] py-2 mr-[20px] border-solid checked:bg-sea-clearHill checked:after:content-['✓']
                        after:text-[#fff] after:absolute after:top-[50%] after:left-[50%] after:-translate-x-[50%] after:-translate-y-[50%]
                        "/>
                </div>
                <div className="w-[200px] h-[30px] flex items-center justify-between">
                    <label htmlFor="#">Primavera</label>
                    <input onClick={() => handleSeasonChange('Spring')} type="checkbox" className="relative cursor-pointer bg-white w-[20px] h-[18px] border-[2px] 
                        border-sea-clearHill rounded-[5px] py-2 mr-[20px] border-solid checked:bg-sea-clearHill checked:after:content-['✓']
                        after:text-[#fff] after:absolute after:top-[50%] after:left-[50%] after:-translate-x-[50%] after:-translate-y-[50%]
                        "/>
                </div>
            </div>
        </div> 
    )
}