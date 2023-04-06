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

window.external = {
    ...window.external,
    receiveMessage: (callback) => {
        const dataCallBack = (e: any) => callback(e.data);
        window.chrome?.webview?.addEventListener('message', dataCallBack);
        return () => window.chrome?.webview?.removeEventListener('message', dataCallBack);
    },
    sendMessage(message) {
        window.chrome?.webview?.postMessage(message);
    },
};

export type ReceiveMessageCallback = (arg: string) => void;

export const receiveMessage = (callback: ReceiveMessageCallback) => window.external.receiveMessage(callback);

export const sendMessage = <T>(message: T) =>
    window.external.sendMessage(typeof message === 'string' ? message : JSON.stringify(message));