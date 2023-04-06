import PhotinoPayload from "./photinoPayload";

type PromiseResolveCallback<T> = (value: T) => void
type PromiseRejectCallback = (reason?: any) => void


class PhotinoChannel<T> {
    private promise: Promise<T> | undefined;
    private promiseResolve: PromiseResolveCallback<T> | undefined;
    private promiseReject: PromiseRejectCallback | undefined;

    private key: string;

    constructor(key: string) {
        this.key = key

        window.external.receiveMessage((message: string) => {
            const { faulted, payload } = PhotinoPayload.tryFromJson<T>(message)

            if (faulted || !payload) return;
            if (payload.key !== key) return;
            if (!this.promise || !this.promiseResolve || !this.promiseReject) return

            this.promiseResolve(payload.data)
        })
    }

    sendMessage = async (message: T) => {
        const payload = new PhotinoPayload<T>(this.key, message);

        window.external.sendMessage(PhotinoPayload.toJson(payload))

        this.promise = new Promise((resolve, reject) => {
            this.promiseResolve = resolve;
            this.promiseReject = reject;
        });

        return this.promise;
    };

    receiveMessage = (message: T) => {
        this.promiseResolve && this.promiseResolve(message);
    };
}

export default PhotinoChannel;