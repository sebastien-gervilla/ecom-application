import { ApplicationStorage, Storage } from "@/helpers/storage";
import { useState } from "react";

/**
 * @description TODO: There is no validity check for now, see WMS
 */
const useLocalStorage = <Key extends keyof ApplicationStorage>(
    key: Key,
    defaultValue: ApplicationStorage[Key]
): [ApplicationStorage[Key], (newValue: ApplicationStorage[Key]) => void] => {
    const [value, setValue] = useState<ApplicationStorage[Key]>(() => {
        const storageValue = Storage.get(key);
        if (!storageValue)
            return defaultValue;

        return JSON.parse(storageValue);
    });

    const set = (newValue: ApplicationStorage[Key]) => {
        Storage.set(key, newValue);
        setValue(newValue);
    }

    return [value, set];
}

export default useLocalStorage;