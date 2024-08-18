// Servicio que consulta el endpoint
import { ProductModal } from '@/types/product.types';
import { CustomMessage } from '@/types/messages.types';
// import axios from './index.services'
import { axiosMultipartInstance, axiosJsonInstance } from './index.services';

const getAllProducts = async () => {
    try {
        const response = await axiosJsonInstance.get('/product');
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

const getProductsWithOutstanding = async () => {
    try {
        const response = await axiosJsonInstance.get('/product/outstanding')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const createProduct = async (productData: FormData) => {
    try {
        const response = await axiosMultipartInstance.post('/product', productData)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const updateProduct = async (productData: FormData) => {
    try {
        const response = await axiosMultipartInstance.put('/product', productData)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

const removeProduct = async (productId: string) => {
    try {
        const response = await axiosJsonInstance.delete(`/product/${productId}`)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

const removeManyProducts = async (arrayProductsId: string[]) => {
    try {
        const response = await axiosJsonInstance.post('product/dmany', { arrayProductsId })
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const productService =
{
    getAllProducts,
    getProductsWithOutstanding,
    createProduct,
    updateProduct,
    removeProduct,
    removeManyProducts
}

