import { Product } from "./product.types";

export type BrandCount = {
    [brand: string]: number;
};

export const countBrands = (elements: Product[]): BrandCount => {
    return elements.reduce((acc: BrandCount, product: Product) => {
        const { brand } = product;
        if (brand in acc) {
            acc[brand] += 1;
        } else {
            acc[brand] = 1;
        }
        return acc;
    }, {});
};   