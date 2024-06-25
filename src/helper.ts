export function excludeKey<T, K extends keyof T>(obj: T, key: K): Omit<T, K> {
    const { [key]: omitted, ...rest } = obj;
    return rest;
}
export function  transformDocument(doc: any): any {
    if (!doc) {
        return null;
    }
    const { _id, __v, ...result } = doc.toObject();
    return result;
}