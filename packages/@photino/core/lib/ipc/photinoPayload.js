class PhotinoPayload {
    key;
    data;
    constructor(key, data) {
        this.key = key;
        this.data = data;
    }
    static fromJson(json) {
        return JSON.parse(json);
    }
    static toJson(payload) {
        return JSON.stringify(payload);
    }
    static tryFromJson(payload) {
        try {
            return {
                faulted: false,
                payload: this.fromJson(payload)
            };
        }
        catch {
            return {
                faulted: true,
                payload: undefined
            };
        }
    }
}
export default PhotinoPayload;
