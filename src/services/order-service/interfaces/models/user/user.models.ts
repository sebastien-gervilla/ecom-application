export interface Login {
    email: string;
    password: string;
}

export interface Register {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface Get {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}

export interface GetById {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isVerified: boolean;
    isSubscribed: boolean;
    isAdministrator: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Current {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}

export enum Role {
    ADMINISTRATOR = 'administrator',
    CLIENT = 'client',
}