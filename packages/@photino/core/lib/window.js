window.external = {
    ...window.external,
    receiveMessage: (callback) => {
        const dataCallBack = (e) => callback(e.data);
        window.chrome?.webview?.addEventListener('message', dataCallBack);
        return () => window.chrome?.webview?.removeEventListener('message', dataCallBack);
    },
    sendMessage(message) {
        window.chrome?.webview?.postMessage(message);
    },
};
export const receiveMessage = (callback) => window.external.receiveMessage(callback);
export const sendMessage = (message) => window.external.sendMessage(typeof message === 'string' ? message : JSON.stringify(message));
