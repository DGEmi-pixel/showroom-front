export interface ApiResponse<T> {
    error: boolean,
    data?: T,
    message: string,
    statusCode: number,
    details?: any
}

export interface ApiError {
    message: string;
    statusCode: number;
    details?: any;
}