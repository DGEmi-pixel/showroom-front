import { BrandCount } from "./brandCount.types";

export type Season = 'Winter' | 'Summer' | 'Autumn' | 'Spring'

export const seasonTranslations = {
    Autumn: 'Otoño',
    Spring: 'Primavera',
    Summer: 'Verano',
    Winter: 'Invierno'
};

export type TypeOfClothing = 'Todos' | 'Formal' | 'Casual' | 'Fiestas' | 'Pijamas' | 'Accesorios'
export type TypeOfSeason = 'Todos' | 'Winter' | 'Summer' | 'Autumn' | 'Spring' //UTILIZADO PARA LOS FILTROS
export type SizeAbb = 'S' | 'M' | 'L' | 'XL' | 'XS'

export type Filter = {
    type?: string;
    size?: number[];
    priceRange?: {
        min?: number;
        max?: number;
    };
    season?: string;
    brand?: string;
};


export interface Product {
    id: string,
    name: string,
    description: string,
    outstanding: boolean,
    season: Season,
    type: TypeOfClothing,
    size: number[],
    brand: string,
    price: number,
    colors: string[],
    offer: boolean,
    discount: number,
    imageUrl: string,
}

//[ ] OBJETO LITERAL RECIBIDO DEL SERVIDOR
export type ServerProduct = {
    _id: string,
    name: string,
    description: string,
    outstanding: boolean,
    season: Season,
    type: TypeOfClothing,
    size: number[],
    brand: string,
    price: number,
    colors: string[],
    offer: boolean,
    discount: number,
    imageUrl: string,
}

//[ ] INTERFAZ PARA SER UTILIZADA EN EL MODAL DE PRODUCTO
export interface ProductModal {
    id: string,
    name: string,
    description: string,
    outstanding: boolean,
    season: Season,
    type: TypeOfClothing,
    size: number[],
    clothsize: number,
    brand: string,
    price: number,
    offer: boolean,
    colors: string[],
    discount: number,
    imageUrl: string,
}

export interface FilterProps {
    products: Product[];
    brandCount: BrandCount;
    onFilterApply: (filters: any) => void;
}

export interface ShowCardProps {
    name: string,
    description: string,
    discount: number,
    price: number,
}

export interface ProductCardProps {
    name: string,
    brand: string,
    imageUrl: string,
    sizesAvailable: number[],
    price: number,
    availableColours: string[],
}

