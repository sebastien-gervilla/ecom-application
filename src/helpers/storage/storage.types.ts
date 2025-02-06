import { Theme } from "@/contexts/ThemeContext";

export interface ApplicationStorage {
    'api-token': string;
    'is-sidebar-reduced': boolean;
    'token': string;
    'theme': Theme;
}