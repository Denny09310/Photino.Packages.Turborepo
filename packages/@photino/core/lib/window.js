"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.receiveMessage = void 0;
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
const receiveMessage = (callback) => window.external.receiveMessage(callback);
exports.receiveMessage = receiveMessage;
const sendMessage = (message) => window.external.sendMessage(typeof message === 'string' ? message : JSON.stringify(message));
exports.sendMessage = sendMessage;
