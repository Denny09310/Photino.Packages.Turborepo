declare global {
    interface Window {
        chrome?: {
            webview?: {
                addEventListener: (message: string, handler: (event: any) => void) => void;
                removeEventListener: (message: string, handler: (event: any) => void) => void;
                postMessage: (message: string) => void;
            };
        };
        readonly external: External;
    }
    interface External {
        sendMessage: (message: string) => void;
        receiveMessage: (callback: ReceiveMessageCallback) => () => void;
    }
}
export type ReceiveMessageCallback = (arg: string) => void;
export declare const receiveMessage: (callback: ReceiveMessageCallback) => () => void;
export declare const sendMessage: <T extends object>(message: T) => void;
