declare class PhotinoPayload<T> {
    key: string;
    data: T;
    constructor(key: string, data: T);
    static fromJson<T>(json: string): PhotinoPayload<T>;
    static toJson<T>(payload: T): string;
    static tryFromJson<T>(payload: string): {
        faulted: boolean;
        payload: PhotinoPayload<T>;
    } | {
        faulted: boolean;
        payload: undefined;
    };
}
export default PhotinoPayload;
