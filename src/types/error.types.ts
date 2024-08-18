interface Product {
    id: number;
    name: string;
}

export interface CustomError extends Error {
    response?: {
        data?: string;
        status?: number;
    };
}
