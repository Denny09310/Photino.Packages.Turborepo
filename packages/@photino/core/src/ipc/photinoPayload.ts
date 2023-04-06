class PhotinoPayload<T> {
    key: string;
    data: T;

    constructor(key: string, data: T) {
        this.key = key;
        this.data = data
    }

    static fromJson<T>(json: string) {
        return JSON.parse(json) as PhotinoPayload<T>
    }

    static toJson<T>(payload: T) {
        return JSON.stringify(payload)
    }

    static tryFromJson<T>(payload: string) {
        try {
            return {
                faulted: false,
                payload: this.fromJson(payload) as PhotinoPayload<T>
            }
        } catch {
            return {
                faulted: true,
                payload: undefined
            }
        }
    }
}

export default PhotinoPayload