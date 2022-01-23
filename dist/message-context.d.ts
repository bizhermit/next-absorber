export declare type MessageType = "info" | "warn" | "err";
export declare type MessageProps = {
    type: MessageType;
    title: string;
    message: string;
};
declare class MessageContext {
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
