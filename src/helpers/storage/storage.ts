import { ApplicationStorage } from "./storage.types";

export default class Storage {

    static get(key: keyof ApplicationStorage): string | null {
        return localStorage.getItem(key);
    }

    // TODO: Should this actually stringify ?
    static set<Key extends keyof ApplicationStorage>(key: Key, value: ApplicationStorage[Key]) {
        const stringified = (typeof value === 'string')
            ? value
            : JSON.stringify(value);

        localStorage.setItem(
            key,
            stringified
        );
    }

    static remove(key: keyof ApplicationStorage) {
        return localStorage.removeItem(key);
    }
}