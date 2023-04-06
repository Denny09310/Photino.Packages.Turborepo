import PhotinoPayload from "./photinoPayload";
class PhotinoChannel {
    promise;
    promiseResolve;
    promiseReject;
    key;
    constructor(key) {
        this.key = key;
        window.external.receiveMessage((message) => {
            const { faulted, payload } = PhotinoPayload.tryFromJson(message);
            if (faulted || !payload)
                return;
            if (payload.key !== key)
                return;
            if (!this.promise || !this.promiseResolve || !this.promiseReject)
                return;
            this.promiseResolve(payload.data);
        });
    }
    sendMessage = async (message) => {
        const payload = new PhotinoPayload(this.key, message);
        window.external.sendMessage(PhotinoPayload.toJson(payload));
        this.promise = new Promise((resolve, reject) => {
            this.promiseResolve = resolve;
            this.promiseReject = reject;
        });
        return this.promise;
    };
    receiveMessage = (message) => {
        this.promiseResolve && this.promiseResolve(message);
    };
}
export default PhotinoChannel;
