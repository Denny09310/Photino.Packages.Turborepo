declare class PhotinoChannel<T> {
    private promise;
    private promiseResolve;
    private promiseReject;
    private key;
    constructor(key: string);
    sendMessage: (message: T) => Promise<T>;
    receiveMessage: (message: T) => void;
}
export default PhotinoChannel;
