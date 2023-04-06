declare class PhotinoIpc<T> {
    private promise;
    private promiseResolve;
    private promiseReject;
    private key;
    constructor(key: string);
    sendMessage: (message: T) => Promise<T>;
    receiveMessage: (message: T) => void;
}
export default PhotinoIpc;
