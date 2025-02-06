/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ORDER_SERVICE_URL: string;
    readonly VITE_GAME_SERVICE_URL: string;
    readonly VITE_MAP_SERVICE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv,
}

declare type ValueOf<T> = T[keyof T]