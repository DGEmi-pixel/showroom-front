import { useState, useEffect } from 'react';
import { productService } from '@/services/product.services';
import { CustomError } from '@/types/error.types';
import { CustomMessage } from '@/types/messages.types';
import { Product, ProductModal, ServerProduct } from '@/types/product.types';
import { countBrands, BrandCount } from '@/types/brandCount.types';
import { useCallback } from 'react';
import { Filter } from '@/types/product.types';

export const useProductHook = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [productLoading, setProductLoading] = useState(true);
    const [productMessage, setProductMessage] = useState<CustomMessage>();
    const [productError, setProductError] = useState<CustomError | null>(null);
    const [brandCount, setBrandCount] = useState<BrandCount>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<Filter>({});

    //CHECKED INPUT
    const [checkedStates, setCheckedStates] = useState<{ [key: string]: boolean }>({})

    const getAllProducts = async () => {
        try {
            //[ ] INDICAMOS QUE EL OBJETO RECIBIDO SERÁ DE TIPO SERVER PRODUCT
            const productData: ServerProduct[] = await productService.getAllProducts()
            setCheckedStates(initilCheckedStates(productData))
            setProducts(productData.map(transformProduct))  //MAPEAMOS LAS PROPIEDADES
            setFilteredProducts(productData.map(transformProduct))
            setProductLoading(false)
            const countedBrands = countBrands(productData.map(transformProduct))
            setBrandCount(countedBrands)
        } catch (err) {
            const error = err as CustomError;
            setProductError(error)
            setProductLoading(false)
            console.log(err)
        }
    };

    const createProduct = async (productData: FormData) => {
        try {
            setProductLoading(true)
            const resServ = await productService.createProduct(productData)
            if(resServ.error === false){
                
                //[ ] ACTUALIZAMOS LOS FILTROS APLICADOS Y LOS PRODUCTOS
                setProducts(prevProducts => [...prevProducts, resServ.data]);
                setFilteredProducts(prevFiltered => [...prevFiltered, resServ.data]);
                setCurrentProducts(prevCurrent => [...prevCurrent, resServ.data]);
            }
            return resServ
        } catch (err) {
            const error = err as CustomError
            setProductError(error)
            console.log(err)
        } finally {
            setProductLoading(false)
        }
    }

    const updateProduct = async (productData: FormData) => {
        try {
            setProductLoading(true)

            const resServ = await productService.updateProduct(productData)
            if(resServ.error === false){
                setProducts(prevProducts => 
                    prevProducts.map(p => 
                        p.id === resServ.data._id ? transformProduct(resServ.data) : p
                    )
                );

                setFilteredProducts(prevFiltered => 
                    prevFiltered.map(p => 
                        p.id === resServ.data._id ? transformProduct(resServ.data) : p
                    )
                );

                setCurrentProducts(prevCurrent => 
                    prevCurrent.map(p => 
                        p.id === resServ.data._id ? transformProduct(resServ.data) : p
                    )
                );
            }

            return resServ
        } catch (err) {
            const error = err as CustomError             
            setProductError(error)
            console.log(err)
        } finally {
            setProductLoading(false)
        }
    }

    const removeProduct = async (productId: string) => {
        try {
            setProductLoading(true)
            const resServ = await productService.removeProduct(productId)
            if(resServ.error === false){
                setProducts(prevProducts => {
                    const updatedProducts = prevProducts.filter(product => product.id !== productId);

                    const filtered = applyFilters(filters);

                     //[ ] ACTUALIZAMOS LOS FILTROS APLICADOS Y LOS PRODUCTOS 
                    setFilteredProducts(filtered);
                    setCurrentProducts(getPaginatedProducts(currentPage, productsPerPage, filtered));
                    return updatedProducts;
                });
            }
            return resServ
        } catch (err) {
            const error = err as CustomError
            setProductError(error)
            console.log(err)
        } finally {
            setProductLoading(false)
        }
    }

    const removeManyProducts = async (arrayProductsId: string[]) => {
        try {
            setProductLoading(true)
            const resServ = await productService.removeManyProducts(arrayProductsId)
            if(resServ.error === false){
                setProducts(prevProducts => {
                    const updatedProducts = prevProducts.filter(product => !arrayProductsId.includes(product.id))

                    const filtered = applyFilters(filters);

                     //[ ] ACTUALIZAMOS LOS FILTROS APLICADOS Y LOS PRODUCTOS 
                    setFilteredProducts(filtered);
                    setCurrentProducts(getPaginatedProducts(currentPage, productsPerPage, filtered));
                    return updatedProducts;
                });
            }
            return resServ
        } catch (err) {
            const error = err as CustomError
            setProductError(error)
            console.log(err)
        } finally {
            setProductLoading(false)
        }
    }

    //UTILS - Producto transformado del sv al app
    const transformProduct = (serverProduct: ServerProduct): Product => {
        return {
            id: serverProduct._id,
            name: serverProduct.name,
            brand: serverProduct.brand,
            colors: serverProduct.colors,
            description: serverProduct.description,
            discount: serverProduct.discount,
            offer: serverProduct.offer,
            outstanding: serverProduct.outstanding,
            price: serverProduct.price,
            season: serverProduct.season,
            size: serverProduct.size,
            type: serverProduct.type,
            imageUrl: serverProduct.imageUrl
        }
    }

    //UTILS - Método para inicializar los estados de los checkbox
    const initilCheckedStates = (productData: ServerProduct[]) => {
        return productData.reduce((acc, product) => {
            acc[product._id] = false
            return acc
        }, {} as { [key: string]: boolean })
    }

    const applyFilters = useCallback((filters: Filter): Product[] => {
        let filtered = products

        setFilters(filters)

        if (filters.type) {
            filtered = filtered.filter(p => p.type === filters.type);
        }
        if (filters.size && filters.size.length > 0) {
            filtered = filtered.filter(p => p.size?.some(size => filters.size!.includes(size)))
        }
        if (filters.priceRange) {
            filtered = filtered.filter(p => {
                const { min, max } = filters.priceRange!;
                return (min ? p.price >= min : true) && (max ? p.price <= max : true);
            });
        }
        if (filters.season) {
            filtered = filtered.filter(p => p.season === filters.season);
        }
        if (filters.brand) {
            filtered = filtered.filter(p => filters.brand!.includes(p.brand));
        }

        return filtered
    }, [products]);

    useEffect(() => {
        getAllProducts();
    }, []); // Empty dependency array to run once on mount

    const getPaginatedProducts = (currentPage: number, productsPerPage: number, products: Product[]) => {
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        return products.slice(indexOfFirstProduct, indexOfLastProduct);
    }

    useEffect(() => {
         // Filtra los productos basado en los filtros aplicados
        const filtered = applyFilters(filters);
        const paginated = getPaginatedProducts(currentPage, productsPerPage, filtered);
        setCurrentProducts(paginated);
    }, [currentPage, productsPerPage, applyFilters, filters]);

    return { products, createProduct, updateProduct, removeProduct, removeManyProducts, checkedStates,setCheckedStates, 
        productLoading, productError, brandCount, currentProducts, productsPerPage, currentPage, setCurrentPage, applyFilters };
};
