declare module "@bizhermit/next-absorber/dist/message-context" {
    export type MessageType = "info" | "warn" | "err";
    export type MessageProps = {
        type: MessageType;
        title: string;
        message: string;
    };
    class MessageContext {
        protected messages: Array<MessageProps>;
        constructor();
        getMessages(): MessageProps[];
        clearMessages(): this;
        addMessage(props: MessageProps): this;
        addInformation(message: string, title?: string): this;
        addWarning(message: string, title?: string): this;
        addError(message: string, title?: string): this;
        hasMessage(type?: MessageType): boolean;
        hasInformation(): boolean;
        hasWarning(): boolean;
        hasError(): boolean;
        getMessageCount(type?: MessageType): number;
        getInformationCount(): number;
        getWarningCount(): number;
        getErrorCount(): number;
    }
    export default MessageContext;
}
declare module "@bizhermit/next-absorber/dist/api-context" {
    import MessageContext from "@bizhermit/next-absorber/dist/message-context";
    class ApiContext extends MessageContext {
        protected req: any;
        protected res: any;
        constructor(req: any, res: any);
        getRequest<T = {
            [key: string]: any;
        }>(): T;
        getResponse<T = {
            [key: string]: any;
        }>(): T;
        getMethod(): string;
        getParams<T = {
            [key: string]: any;
        }>(): T;
        getQuery(key: string): string | string[];
        getCookie(key: string): string;
        getSessionID(): string;
        getSession<T>(key: string): T | null;
        setSession(key: string, value: any): this;
        clearSession(key?: string): this;
        protected clearSessionByKey(key: string): void;
        regenerateSession(keepParams?: boolean): Promise<this>;
        protected setData(data: {
            [key: string]: any;
        }): this;
        protected setStatus(code: number): void;
        done(data?: {
            [key: string]: any;
        }, message?: string, title?: string): void;
        doneAs(code?: number, data?: {
            [key: string]: any;
        }, message?: string, title?: string): void;
        error(err?: any): void;
    }
    export default ApiContext;
}
declare module "@bizhermit/next-absorber/dist/fetch" {
    import { MessageProps } from "@bizhermit/next-absorber/dist/message-context";
    type FetchOptions = {
        method?: "POST" | "GET" | "PUT" | "DELETE" | "INSERT";
        headers?: {
            [key: string]: string;
        };
    };
    export const fetchData: <T = {
        [key: string]: any;
    }>(url: string, params?: {
        [key: string]: any;
    } | undefined, options?: FetchOptions | undefined) => Promise<T>;
    export const fetchDataSync: <T = {
        [key: string]: any;
    }>(url: string, params: {
        [key: string]: any;
    }, options: FetchOptions, callback?: ((res: T) => void) | undefined) => void;
    type FetchApiResponse<T = {
        [key: string]: any;
    }> = {
        data: T;
        messages: Array<MessageProps>;
        hasInformation: boolean;
        hasWarning: boolean;
        hasError: boolean;
    };
    export const fetchApi: <T = {
        [key: string]: any;
    }>(url: string, params?: {
        [key: string]: any;
    } | undefined, options?: FetchOptions | undefined) => Promise<FetchApiResponse<T>>;
    export const fetchApiSync: <T = {
        [key: string]: any;
    }>(url: string, params: {
        [key: string]: any;
    }, options: FetchOptions, callback: (res: FetchApiResponse<T>) => void) => void;
}
