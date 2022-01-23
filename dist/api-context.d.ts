import MessageContext from "./message-context";
declare class ApiContext extends MessageContext {
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
