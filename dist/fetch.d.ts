import { MessageProps } from "./message-context";
declare type FetchOptions = {
    method?: "POST" | "GET" | "PUT" | "DELETE" | "INSERT";
    headers?: {
        [key: string]: string;
    };
};
export declare const fetchData: <T = {
    [key: string]: any;
}>(url: string, params?: {
    [key: string]: any;
} | undefined, options?: FetchOptions | undefined) => Promise<T>;
export declare const fetchDataSync: <T = {
    [key: string]: any;
}>(url: string, params: {
    [key: string]: any;
}, options: FetchOptions, callback?: ((res: T) => void) | undefined) => void;
declare type FetchApiResponse<T = {
    [key: string]: any;
}> = {
    data: T;
    messages: Array<MessageProps>;
    hasInformation: boolean;
    hasWarning: boolean;
    hasError: boolean;
};
export declare const fetchApi: <T = {
    [key: string]: any;
}>(url: string, params?: {
    [key: string]: any;
} | undefined, options?: FetchOptions | undefined) => Promise<FetchApiResponse<T>>;
export declare const fetchApiSync: <T = {
    [key: string]: any;
}>(url: string, params: {
    [key: string]: any;
}, options: FetchOptions, callback: (res: FetchApiResponse<T>) => void) => void;
export {};
