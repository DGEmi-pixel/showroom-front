import { useState, useEffect } from 'react';
import { productService } from '@/services/product.services';
import { CustomError } from '@/types/error.types';
import { Product } from '@/types/product.types';

//[ ] HOOK PARA OBTENER LOS TRES ITEMS CON DESCUENTO
export const useDiscountHook = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<CustomError | null>(null);

    useEffect(() => {
        const fetchProductsWithOffer = async () => {
            try {
                setLoading(true);
                const productsData = await productService.getProductsWithOutstanding();
                setProducts(productsData);
            } catch (err) {
                const error = err as CustomError;                
                setError(error);
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProductsWithOffer();
    }, []);

    return { products, loading, error };
}

export const useOfferCalc = (priceToCalc: number, discount: number) => {
    return (priceToCalc - (priceToCalc * discount)/100)
}