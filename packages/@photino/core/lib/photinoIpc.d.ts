declare class PhotinoIpc<T> {
    private promise;
    private promiseResolve;
    private promiseReject;
    private channelKey;
    constructor(channelKey: string);
    sendMessage: (message: T) => Promise<T>;
    receiveMessage: (message: T) => void;
    private parseResponse;
}
export default PhotinoIpc;
