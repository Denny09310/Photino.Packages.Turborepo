const SEPARATOR = " - ";
class PhotinoIpc {
    promise;
    promiseResolve;
    promiseReject;
    channelKey;
    constructor(channelKey) {
        this.channelKey = channelKey;
        window.external.receiveMessage((message) => {
            const keyMessageValuePair = message.split(SEPARATOR);
            const [parsedKey, parsedMessage] = keyMessageValuePair;
            if (parsedKey !== channelKey)
                return;
            if (!this.promise || !this.promiseResolve || !this.promiseReject)
                return;
            this.promiseResolve(this.parseResponse(parsedMessage));
        });
    }
    sendMessage = async (message) => {
        const jsonMessage = typeof message === 'string' ? message : JSON.stringify(message);
        window.external.sendMessage(`${this.channelKey}${SEPARATOR}${jsonMessage}`);
        this.promise = new Promise((resolve, reject) => {
            this.promiseResolve = resolve;
            this.promiseReject = reject;
        });
        return this.promise;
    };
    receiveMessage = (message) => {
        this.promiseResolve && this.promiseResolve(message);
    };
    parseResponse(message) {
        try {
            return JSON.parse(message);
        }
        catch {
            return message;
        }
    }
}
export default PhotinoIpc;
