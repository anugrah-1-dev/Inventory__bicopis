import { Config } from "ziggy-js";

export interface User {
    id: number;
    name: string;
    email: string;
    shop_id: number;
}

export interface TableHeader{
    name?: string;
    label: string;
    sortable?: boolean;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    flash: {
        success: string | null;
        error: string | null;
      };
    ziggy: Config & { location: string };
};
